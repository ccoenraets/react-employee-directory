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

var EmployeePage = React.createClass({
    getInitialState: function() {
        return {employee: {}};
    },
    componentDidMount: function() {
        this.props.service.findById(this.props.employeeId).done(function(result) {
            this.setState({employee: result});
        }.bind(this));
    },
    render: function () {
        return (
            <div>
                <Header text="Employee Details"/>
                <h3>{this.state.employee.firstName} {this.state.employee.lastName}</h3>
                {this.state.employee.title}
            </div>
        );
    }
});

router.addRoute('', function() {
    React.render(
        <HomePage service={employeeService}/>,
        document.body
    );
});

router.addRoute('employees/:id', function(id) {
    React.render(
        <EmployeePage employeeId={id} service={employeeService}/>,
        document.body
    );
});
router.start();