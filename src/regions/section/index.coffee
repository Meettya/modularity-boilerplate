###
This is example CoffeeScript file
###

module.exports = class SectionRegionManager

  constructor: (mount_point) ->
    # точка монтирования региона
    @_mount_point_ = mount_point

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
    @_mount_point_.html '<span>worked</span>'


  _showPageNotFound : (page) =>
    @_mount_point_.html "404! Not found page |#{page}|"


