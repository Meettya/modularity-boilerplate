###
Это заглавный файл всего приложения
###

_           = require 'lodash'


SectionRegion = require './regions/section'

module.exports = class App

  constructor: (options={}) ->
    @_mount_points_ = null
    @_regions_ = {}

  ###
  Передаем точки монтирования, пока наивно
  ###
  setMountPoints: (mount_points) =>
    @_mount_points_ = mount_points
    @_regions_.section = new SectionRegion mount_points.section

  ###
  Это как бы рендерер глобальный для нашей странички, имитирует перелистывание
  ###
  show : (page) =>
    switch page.toUpperCase()
      when 'INDEX' then @_showPageIndex()

      else 
        @_showPageNotFound page

  ###
  Тут рисуем индексную страницу - это должен быть конечно же вызов процедуры, а не на месте
  ###
  _showPageIndex : =>
    @_regions_.section.show 'index'


  _showPageNotFound : (page) =>
    @_regions_.section.show 404, "404! Not found page |#{page}|"


