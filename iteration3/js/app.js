var Header = React.createClass({
    render: function () {
        return (
            <h1 className="title">{this.props.text}</h1>
        );
    }
});

var SearchBar = React.createClass({
    searchHandler: function() {
        this.props.searchHandler(this.refs.searchKey.getDOMNode().value);
    },
    render: function () {
        return (
            <input type="search" ref="searchKey" onChange={this.searchHandler}/>
        );
    }
});

var EmployeeListItem = React.createClass({
    render: function () {
        return (
            <li>
                <a href={"#employees/" + this.props.employee.id}>
                    {this.props.employee.firstName} {this.props.employee.lastName}
                </a>
            </li>
        );
    }
});

var EmployeeList = React.createClass({
    render: function () {
        var items = this.props.employees.map(function (employee) {
            return (
                <EmployeeListItem key={employee.id} employee={employee}/>
            );
        });
        return (
            <ul>
                {items}
            </ul>
        );
    }
});

var HomePage = React.createClass({
    searchHandler:function(key) {
        alert('Search key: ' + key);
    },
    render: function () {
        var employees = [
            {firstName: 'Christophe', lastName: 'Coenraets'},
            {firstName: 'Lisa', lastName: 'Jones'},
            {firstName: 'John', lastName: 'Smith'}
        ];
        return (
            <div>
                <Header text="Employee Directory"/>
                <SearchBar searchHandler={this.searchHandler}/>
                <EmployeeList employees={employees}/>
            </div>
        );
    }
});

React.render(
    <HomePage/>,
    document.body
);