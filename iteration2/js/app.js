var Header = React.createClass({
    render: function () {
        return (
            <h1 className="title">{this.props.text}</h1>
        );
    }
});

var SearchBar = React.createClass({
    render: function () {
        return (
            <input type="search" />
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
    render: function () {
        var employees = [
            {id: 1, firstName: 'Christophe', lastName: 'Coenraets'},
            {id: 2, firstName: 'Lisa', lastName: 'Jones'},
            {id: 3, firstName: 'John', lastName: 'Smith'}
        ];
        return (
            <div>
                <Header text="Employee Directory"/>
                <SearchBar />
                <EmployeeList employees={employees}/>
            </div>
        );
    }
});

React.render(
    <HomePage />,
    document.body
);
