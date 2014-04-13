
// Generated by clinch 0.5.7
(function() {
  'use strict';
  
  var dependencies, sources, require, modules_cache = {};
  dependencies = {"1aqexf":{"./regions/tasks_manager":"13VFAM","lodash":"Zc7rvy","react":"Z1Rp5Bu"},"13VFAM":{"react":"Z1Rp5Bu","../components/task_table":"ZJTMHI"},"ZJTMHI":{"./task_item":"Z2cBwJE","react":"Z1Rp5Bu","lodash":"Zc7rvy"},"Z2cBwJE":{"./custom_trigger":"Z11DAat","react":"Z1Rp5Bu","react-bootstrap":"1OAnO6"},"Z11DAat":{"react-bootstrap":"1OAnO6"}};

  sources = {
"ZAAnyu": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/web_modules/jquery.coffee 

/*
This is Jquery shim
 */
module.exports = this.jQuery;

},
"Zc7rvy": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/web_modules/lodash.coffee 

/*
This is lodash shim
 */
module.exports = this._;

},
"ZyB9KT": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/web_modules/backbone.coffee 

/*
This is Backbone shim
 */
module.exports = this.Backbone;

},
"Z1Rp5Bu": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/web_modules/react.coffee 

/*
This is React shim
 */
module.exports = this.React;

},
"1OAnO6": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/web_modules/react-bootstrap.coffee 

/*
This is ReactBootstrap shim
 */
module.exports = this.ReactBootstrap;

},
"1aqexf": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/src/app.csbx 
/** @jsx React.DOM */;

/*
Это заглавный файл всего приложения
 */
var App, React, TasksManager, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = require('lodash');

React = require('react');

TasksManager = require('./regions/tasks_manager');

module.exports = App = (function() {
  function App(options) {
    if (options == null) {
      options = {};
    }
    this._showPageNotFound = __bind(this._showPageNotFound, this);
    this._showPageIndex = __bind(this._showPageIndex, this);
    this.show = __bind(this.show, this);
    this.setMountPoints = __bind(this.setMountPoints, this);
    this._mount_points_ = null;
  }


  /*
  Передаем точки монтирования, пока наивно
   */

  App.prototype.setMountPoints = function(mount_points) {
    return this._mount_points_ = mount_points;
  };


  /*
  Это как бы рендерер глобальный для нашей странички, имитирует перелистывание
   */

  App.prototype.show = function(page) {
    switch (page.toUpperCase()) {
      case 'INDEX':
        return this._showPageIndex();
      default:
        return this._showPageNotFound(page);
    }
  };


  /*
  Тут рисуем индексную страницу - это должен быть конечно же вызов процедуры, а не на месте
   */

  App.prototype._showPageIndex = function() {
    var _this;
    _this = this;
    return React.renderComponent(
      TasksManager( {url:"data/tasks.json"}),
      _this._mount_points_.section
    );;
  };

  App.prototype._showPageNotFound = function(page) {};

  return App;

})();

},
"13VFAM": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/src/regions/tasks_manager.csbx 
/** @jsx React.DOM */;

/*
This is example CoffeeScript React file
 */
var React, TaskTable, TasksManager;

React = require('react');

TaskTable = require('../components/task_table');

module.exports = TasksManager = React.createClass({displayName: 'TasksManager',
  getInitialState: function() {
    return {
      data: []
    };
  },
  handleDeleteClick: function(num) {
    this.state.data.splice(num, 1);
    this.setState({
      data: this.state.data
    });
    return null;
  },
  componentWillMount: function() {
    var _this;
    _this = this;
    $.ajax({
      url: _this.props.url,
      dataType: 'json',
      success: (function(_this) {
        return function(in_data) {
          return _this.setState({
            data: in_data.tasks
          });
        };
      })(this),
      error: (function(_this) {
        return function(xhr, status, err) {
          return console.error(_this.props.url, status, err.toString());
        };
      })(this)
    });
    return null;
  },
  render: function() {
    return React.DOM.div( {className:"container"}, 
      TaskTable( {data:this.state.data, handleDeleteClick:this.handleDeleteClick})
    );
  }
});

},
"ZJTMHI": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/src/components/task_table.csbx 
/** @jsx React.DOM */;

/*
This is example CoffeeScript React file
 */
var React, Task, TaskTable, _;

React = require('react');

Task = require('./task_item');

_ = require('lodash');

module.exports = TaskTable = React.createClass({displayName: 'TaskTable',
  render: function() {
    var TaskRows, _this;
    _this = this;
    TaskRows = this.props.data.map(function(task, num) {
      return Task( {isDone:task.isDone, text:task.text, pos:task.id, desc:task.desc, handleDeleteClick:_this.props.handleDeleteClick, key:num}, task.title);
    });
    return React.DOM.table( {className:"table table-striped table-hover"}, 
      React.DOM.thead(null, 
        React.DOM.tr(null, 
          React.DOM.th(null, "#"),
          React.DOM.th(null, "title"),
          React.DOM.th(null, "action")
        )
      ),
      React.DOM.tbody(null, 
         TaskRows 
      )
    );
  }
});

},
"Z2cBwJE": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/src/components/task_item.csbx 
/** @jsx React.DOM */;

/*
This is example CoffeeScript React file
 */
var Button, ButtonToolbar, CustomTrigger, React, TaskItem, classSet, _ref;

React = require('react');

_ref = require('react-bootstrap'), ButtonToolbar = _ref.ButtonToolbar, Button = _ref.Button;

CustomTrigger = require('./custom_trigger');

classSet = React.addons.classSet;

module.exports = TaskItem = React.createClass({displayName: 'TaskItem',
  render: function() {
    var classes, content, id, _props;
    _props = this.props;
    id = this.props.pos;
    content = this.props.children;
    classes = classSet({
      active: true,
      success: this.props.isDone
    });
    return React.DOM.tr( {className:classes}, 
      React.DOM.td(null, 
        id
      ),
      React.DOM.td(null, 
        React.DOM.span(null, 
          content
        )
      ),
      React.DOM.td(null, 
        ButtonToolbar(null, 
          CustomTrigger( {data:_props}, "Show"),
          Button( {bsStyle:"primary"}, "Edit"),
          Button( {bsStyle:"primary", onClick:function(){_props.handleDeleteClick(_props.key)}}, "Delete")
        )
      )
    );
  }
});

},
"Z11DAat": function(exports, module, require) {
// /Users/meettya/github/modularity-boilerplate/src/components/custom_trigger.jsx 
/** @jsx React.DOM */

var OverlayTriggerMixin = require('react-bootstrap').OverlayTriggerMixin;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;

// Our custom component is managing wether the Modal is visible
var CustomTrigger = React.createClass({displayName: 'CustomTrigger',
  mixins: [OverlayTriggerMixin],

  getInitialState: function () {
    return {
      isModalOpen: false
    };
  },

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  },

  render: function () {
    return (
      Button( {onClick:this.handleToggle, bsStyle:"primary"}, this.props.children)
    );
  },

  // This is called by `OverlayTriggerMixin` when this
  // component is mounted or updated and the return value
  // is appended to the body
  renderOverlay: function () {
    if (this.state.isModalOpen) {
      return (
        Modal( {title:'# ' + this.props.data.pos + ' ' + this.props.data.children, onRequestHide:this.handleToggle}, 
          React.DOM.div( {className:"modal-body"}, 
            React.DOM.h2(null, 
              this.props.data.text
            ),
            React.DOM.div(null, 
              this.props.data.desc
            )
          ),
          React.DOM.div( {className:"modal-footer"}, 
            Button( {onClick:this.handleToggle}, "Close")
          )
        )
      )
    }

    return React.DOM.span(null);
  }
});

module.exports = CustomTrigger;
}};

var clinch_runtime_v2 = (function(exports){
/*!
 * Clinch - runtime lib
 * version 2
 * Copyright(c) 2013 Dmitrii Karpich <meettya@gmail.com>
 * MIT Licensed
 */

  var name_resolver_builder, internal_require_builder;

  name_resolver_builder = function(dependencies){
    return function(parent, name) {
      if (dependencies[parent] == null) {
        throw Error("no dependencies list for parent |" + parent + "|");
      }
      if (dependencies[parent][name] == null) {
        throw Error("no one module resolved, name - |" + name + "|, parent - |" + parent + "|");
      }
      return dependencies[parent][name];
    };
  };

  internal_require_builder = function(sources, name_resolver, modules_cache){
    var require, resolve_code, _this = this;

    require = function (name, parent) {
      var module_source, resolved_name;
      if (!(module_source = sources[name])) {
        resolved_name = name_resolver(parent, name);
        if (!(module_source = sources[resolved_name])) {
          throw Error("can`t find module source code: original_name - |" + name + "|, resolved_name - |" + resolved_name + "|");
        }
      }
      resolved_name = resolved_name != null ? resolved_name : name;
      if (modules_cache != null) {
        if (modules_cache[resolved_name] != null) {
          return modules_cache[resolved_name];
        }
        else {
          return modules_cache[resolved_name] = resolve_code(module_source, resolved_name);
        }
      }
      else {
        return resolve_code(module_source, resolved_name);
      }
    };

    resolve_code = function (module_source, resolved_name) {
      var exports, module, _ref;
      module_source.call(_this,exports = {}, module = {exports : exports}, function(mod_name) {
        return require(mod_name, resolved_name);
      });
      return (_ref = module.exports) != null ? _ref : exports;
    };

    return require;
  };

  // not require itself but builder
  exports.require_builder = function(dependencies, sources, modules_cache){
    return internal_require_builder.call(this, sources, name_resolver_builder(dependencies), modules_cache);
  };

  return exports;

})({});

require = clinch_runtime_v2.require_builder.call(this, dependencies, sources, modules_cache);

/* bundle export */
this.AppPackage = {
  App : require("1aqexf")
};
}).call(this);