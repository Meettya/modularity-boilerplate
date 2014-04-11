###
This is command library

to wipe out Gruntfile from realization 
###
async         = require 'async'
path          = require 'path'
fs            = require 'fs-extra'
{spawn, exec} = require 'child_process'
_             = require 'lodash'
Clinch        = require 'clinch'

{ncp}         = require 'ncp'
ncp.limit = 16

packer = new Clinch

{get_pack_config} = require './pack_configurator'

###
Just proc extender
###
proc_extender = (proc, cb) =>
  proc.stderr.on 'data', (buffer) -> console.log "#{buffer}"
  proc.stdout.on 'data', (buffer) -> console.log "#{buffer}"
  proc.on        'exit', (status) ->
    process.exit(1) if status != 0
    cb() if typeof cb is 'function' 
  null

# Run jade compiler
run_jade = (args, cb) =>
  proc_extender spawn('node', ['./node_modules/.bin/jade'].concat(args)), cb

#Run nodemon for one directory only
run_nodemon = (filename, args, cb) =>
  # yes, chroot it in grunt directory
  process.chdir path.dirname filename
  proc_extender spawn('nodemon', [path.basename filename].concat(args)), cb


###
Generate array of files from directory, selected on filter as RegExp
###
make_files_list = (in_dir, filter_re) ->
  for file in fs.readdirSync in_dir when file.match filter_re
    path.join in_dir, file 

compile_jade = (source_dir, result_dir, cb) ->
  files = make_files_list source_dir, /\.jade$/
  run_jade ['--pretty', '--no-debug', '--out', result_dir].concat(files), ->
    console.log ' -> build test html for browser done'
    cb() if typeof cb is 'function'

copy = (source_dir, result_dir, cb) ->
  ncp source_dir, result_dir, (err) ->
    throw err if err?
    console.log 'copy done!'
    cb() if typeof cb is 'function'

compile_src = (bundle_name, root_path, result_dir, cb) ->

  source_dir = path.join root_path, 'src'
  files = make_files_list source_dir, /\.coffee$/

  all_done = _.after files.length, cb

  for file in files
    do (file) ->
      filename = path.basename file, '.coffee'

      pack_config = get_pack_config filename

      packer.buldPackage bundle_name, pack_config, (err, data) ->
        throw err if err?
        fs.outputFile "#{path.join result_dir, filename}.js", data, encoding= 'utf8', (err) ->
          throw err if err?
          console.log "Compiled #{filename}.js"
          all_done

clinch_files_list = (root_path, cb) ->

  source_dir = path.join root_path, 'src'
  files = make_files_list source_dir, /\.coffee$/

  all_done = _.after files.length, cb

  for file in files
    do (file) ->
      filename = path.basename file, '.coffee'

      pack_config = get_pack_config filename

      packer.getPackageFilesList pack_config, (err, data) ->
        throw err if err?
        console.log "List for |#{filename}|"
        console.log data
        console.log "Total #{data.length} files\n"
        all_done

###
This function run web-server
###
run_server = (file_name, cb) ->
  run_nodemon file_name, [], cb

###
Just clean up all in directory
###
clean = (init_directory, cb) ->
  fs.remove init_directory, (err) ->
    throw err if err?
    fs.mkdirs init_directory, (err) ->
      throw err if err?
      console.log 'clean up done'
      cb() if typeof cb is 'function'


###
This is node.js version of bash gh-pages updater, now in color! :)
Before use it create gh-pages brunch first

git checkout --orphan gh-pages
git commit -am'* first gh-pages commit'

than return to master

###
update_gh_pages = (document_directory, gh_pages_branch, main_cb) ->

  # internal spawn helper
  git_spawn_helper = (cb, command, args...) =>
    #console.log args
    git_spawn = spawn 'git', [command].concat args
    git_spawn.stderr.on 'data', (buffer) -> cb "#{buffer}"
    git_spawn.on 'exit', (status) ->
      process.exit(1) if status != 0
      if command is 'update-ref'
        cb null, 'OK'
    git_spawn.stdout.on 'data', (data) ->
      cb null, "#{data}".trim()

  # start magic engine
  async.auto

    get_gh_pages_sha : (cb) ->
      git_spawn_helper cb, 'rev-parse', gh_pages_branch

    get_doc_dir_sha : (cb) ->
      git_spawn_helper cb, 'rev-parse', "master:#{document_directory}"

    get_doc_commit_message : (cb) ->
      git_spawn_helper cb, 'log', "--format='%s'", '-n', 1 , document_directory

    create_new_commit : [
      'get_gh_pages_sha'
      'get_doc_dir_sha'
      'get_doc_commit_message'

      (cb, results) ->
        #this works at git version 1.8.0.2, and NOT WORK at 1.7 - update git
        git_spawn_helper cb, 'commit-tree',
          '-p', results.get_gh_pages_sha,
          '-m', results.get_doc_commit_message,
          results.get_doc_dir_sha
    ]

    save_commit : [
      'create_new_commit'
      (cb, results) ->
        git_spawn_helper cb, 'update-ref',
          gh_pages_branch,
          results.create_new_commit
    ]

    # finalizer
    (err, results) ->
      if err
        console.log err 
        process.exit 1

      console.log results.save_commit 
      console.log 'Update for GitHub pages done'
      main_cb


module.exports = {
  compile_jade,
  copy,
  compile_src,
  update_gh_pages,
  clinch_files_list,
  run_server,
  clean
}
