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
                <EmployeeListItem key={employee.id} employee={employee} />
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
    getInitialState: function() {
        return {employees: []}
    },
    searchHandler:function(key) {
        this.props.service.findByName(key).done(function(result) {
            this.setState({searchKey: key, employees: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header text="Employee Directory"/>
                <SearchBar searchHandler={this.searchHandler}/>
                <EmployeeList employees={this.state.employees}/>
            </div>
        );
    }
});

React.render(
    <HomePage service={employeeService}/>,
    document.body
);