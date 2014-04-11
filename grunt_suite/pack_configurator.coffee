###
This is common package config
used in server and in build comand
###

path = require 'path'
root_path = path.join  __dirname, '..'

get_pack_config = (filename) ->

  switch filename
    when 'app'
      package_name : 'AppPackage'
      bundle : 
        App : path.join root_path, "src", filename
      replacement :
        jquery    : path.join root_path, 'web_modules', 'jquery'
        lodash    : path.join root_path, 'web_modules', 'lodash'        
        backbone  : path.join root_path, 'web_modules', 'backbone'
        'backbone.marionette' : path.join root_path, 'web_modules', 'backbone.marionette'

    else
      throw Error "dont know |#{filename}| settings"

module.exports = {
  get_pack_config
}