var socket = io('http://localhost:27779');

var vm = new Vue({
  el: '#app',
  data: {
    ecs: [],
    search: ''
  },
  computed: {
    filteredEcs: function () {
      var self = this
      var search = self.search.toLowerCase();
      return self.ecs.filter(function (ec) {
        for (var p in ec) {
          if (typeof ec[p] !== 'string') { continue; }
          if (ec[p].toLowerCase().indexOf(search) !== -1) { return true; }
        }
        return false;
      });
    }
  },
  mounted: function () {
    var self = this;

    socket.on('ec', function (data) {
      self.ecs.push(data);
      if (self.ecs.length > 500) { self.ecs.shift(); }
    });
  },
  methods: {
    clean: function () {
      this.ecs = [];
    }
  }
});