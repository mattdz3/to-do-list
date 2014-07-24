ToDo = Backbone.Model.extend({

	initialize: function() {
		this.on('change', function() {
			//the future is now!
		});
	},

	idAttribute: '_id',
})

ToDoCollection = Backbone.Collection.extend({

	model: ToDo,

	url: 'http://tiny-pizza-server.herokuapp.com/collections/MD-toDoList',
})

ToDoView = Backbone.View.extend({

	className: "all-the-tasks",

	template: _.template($('.to-do-list').text()),
	editTemplate: _.template($('.to-do-list-edit').text()),

//events only work in this.el
	events: {
		"click .edit-task"     : "editTask",
		"click .finished-edit" : "finishedEdit",
		"click .remove-task"   : "deleteTask",
	},

	initialize: function() {
		console.log(this)
		this.listenTo(this.model, 'change', this.render),
		$('.container').append(this.el)
		this.render();
	},

	render: function() {
		var renderTemp = this.template(this.model.attributes)
		this.$el.html(renderTemp);
	},

	editTask: function() {
		var renderTemp = this.editTemplate(this.model.attributes)
		this.$el.html(renderTemp);
	},

	finishedEdit: function() {
		
		$('.finished-edit-input').val()
		var renderTemp = this.template(this.model.attributes)
		this.$el.html(renderTemp);
	},

	deleteTask: function() {
		this.model.destroy();
		this.remove();
	},
})

var toDoTasks = new ToDoCollection();

toDoTasks.fetch().done(function() {
	console.log(toDoTasks)
	toDoTasks.each(function(task) {
		new ToDoView({model: task});
	})
});

$('.submit-task').click(function() {
	console.log("hey")
	var newTask = new ToDoCollection;

	var name = $('.task-input').val()
	
	newTask.create({task: name})
	new ToDoView();
})



