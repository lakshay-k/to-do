(window["webpackJsonpto-do"]=window["webpackJsonpto-do"]||[]).push([[0],{11:function(e,t,a){e.exports=a(18)},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(3),s=a.n(c),o=(a(16),a(4)),r=a(5),m=a(6),i=a(9),d=a(7),u=a(1),h=a(10),p=(a(17),a(8)),k=a.n(p),b=function(e){return l.a.createElement("div",{className:"row form-section border border-danger p-5 rounded"},l.a.createElement("div",{className:"col-sm-12 col-md-8"},l.a.createElement("form",{onSubmit:e.handleSubmit,className:"form-add-task"},l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,l.a.createElement("h3",null,l.a.createElement("i",null,"Task to do.."))),l.a.createElement("textarea",{name:"task",required:"required",type:"text",className:"form-control",placeholder:"Task to do",value:e.task,onChange:function(t){return e.handleChange(t,"task")}})),l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,l.a.createElement("h3",null,l.a.createElement("i",null,"Complete By:"))),l.a.createElement("input",{name:"date",type:"date",required:"required",className:"form-control",value:e.date,onChange:function(t){return e.handleChange(t,"date")}})),l.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"Submit"}))),l.a.createElement("div",{className:"col-sm-12 col-md-4 text-center"},l.a.createElement("img",{src:k.a,className:"form-img-dim"})))},f=function(e){return e.data.length?e.data.map(function(t,a){if(0===t.compStatus)return l.a.createElement("div",{className:"card data-cont border-primary mt-4",key:a},l.a.createElement("div",{className:"card-body"},l.a.createElement("h5",{className:"card-title"},t.task),l.a.createElement("p",{className:"card-text"},t.date),l.a.createElement("input",{type:"button",className:"btn btn-danger",onClick:function(t){return e.deleteItem(t,a)},name:"button",value:"Delete Task"}),l.a.createElement("div",{className:"form-check"},l.a.createElement("input",{type:"checkbox",className:"form-check-input",id:"to-do-complete",onClick:function(t){return e.taskComplete(t,a)}}),l.a.createElement("label",{className:"form-check-label",for:"to-do-complete"},"Task Complete"))))}):l.a.createElement("h1",null,"NotFound")},E=function(e){return e.data.length?e.data.map(function(t,a){if(1===t.compStatus)return l.a.createElement("div",{className:"card data-cont border-success mt-4",key:a},l.a.createElement("div",{className:"card-body"},l.a.createElement("h5",{className:"card-title"},t.task),l.a.createElement("p",{className:"card-text"},t.date),l.a.createElement("input",{type:"button",className:"btn btn-success",onClick:function(t){return e.deleteItem(t,a)},name:"button",value:"Delete Task"}),l.a.createElement("div",{className:"form-check"},l.a.createElement("input",{type:"checkbox",className:"form-check-input",id:"to-complete",onClick:function(t){return e.taskIncomplete(t,a)}}),l.a.createElement("label",{className:"form-check-label",for:"to-complete"},"Task In Complete"))))}):l.a.createElement("h1",null,"NotFound")},v=function(e){return l.a.createElement("div",null,l.a.createElement("header",{className:"row text-center p-4"},l.a.createElement("h1",null,"My To Do List")))},N=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).deleteItem=function(t,a){t.preventDefault();var n=e.state.tasks;n.splice(a,1),localStorage.setItem("localData",JSON.stringify(n)),e.setState({tasks:n})},e.taskComplete=function(t,a){var n=e.state.tasks;n[a].compStatus=1,localStorage.setItem("localData",JSON.stringify(n)),e.setState({tasks:n})},e.taskIncomplete=function(t,a){var n=e.state.tasks;n[a].compStatus=0,localStorage.setItem("localData",JSON.stringify(n)),e.setState({tasks:n})},e.state={task:"",date:1.1/1995,compStatus:0,tasks:[]},e.handleChange=e.handleChange.bind(Object(u.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(u.a)(e)),e.deleteItem=e.deleteItem.bind(Object(u.a)(e)),e.taskComplete=e.taskComplete.bind(Object(u.a)(e)),e.taskIncomplete=e.taskIncomplete.bind(Object(u.a)(e)),e}return Object(h.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=localStorage.getItem("localData");e?this.setState({tasks:JSON.parse(e)}):localStorage.setItem("localData",[])}},{key:"handleChange",value:function(e,t){this.setState(Object(o.a)({},t,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.state.tasks;t.push({task:this.state.task,date:this.state.date,compStatus:this.state.compStatus}),this.setState({tasks:t}),localStorage.setItem("localData",JSON.stringify(t))}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(v,null),l.a.createElement(b,{task:this.state.task,handleChange:this.handleChange,date:this.state.date,handleSubmit:this.handleSubmit}),l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col-sm-12 col-md-6 text-center mt-5"},l.a.createElement("h2",null,l.a.createElement("i",null,"To Do")),l.a.createElement(f,{data:this.state.tasks,deleteItem:this.deleteItem,taskComplete:this.taskComplete})),l.a.createElement("div",{className:"col-sm-12 col-md-6 text-center mt-5"},l.a.createElement("h2",null,l.a.createElement("i",null,"Completed")),l.a.createElement(E,{data:this.state.tasks,deleteItem:this.deleteItem,taskIncomplete:this.taskIncomplete}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,a){e.exports=a.p+"static/media/man.954c7987.png"}},[[11,1,2]]]);
//# sourceMappingURL=main.ec926828.chunk.js.map