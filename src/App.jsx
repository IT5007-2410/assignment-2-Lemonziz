/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1,
    name: 'Jack',
    phone: 88885555,
    bookingTime: new Date()
  },
  {
    id: 2,
    name: 'Rose',
    phone: 88884444,
    bookingTime: new Date()
  }
];

function TravellerRow(props) {
  {
    /*Q3. Placeholder to initialize local variable based on traveller prop.*/
  }
  const t = props.traveller || [];
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{t.id}</td>
      <td>{t.name}</td>
      <td>{t.phone}</td>
      <td>{t.bookingTime.toLocaleString()}</td>
    </tr>
  );
}

function Display(props) {
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const ts = props.travellers || [];
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {ts.map((traveller) => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const travellerName = e.target.travellername.value;
    const travellerPhone = e.target.phone.value;
    const lastTraveller =
      this.props.travellers[this.props.travellers.length - 1];
    const newID = lastTraveller ? lastTraveller.id + 1 : 1;
    const new_traveller = {
      id: newID,
      name: travellerName,
      phone: travellerPhone,
      bookingTime: new Date()
    };
    this.props.bookFunc(new_traveller);
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="text" name="phone" placeholder="Phone Number" />
        <button>Add</button>
      </form>
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const id = +e.target.travellerid.value;
    console.log(typeof id);
    this.props.deleteFunc(id);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="number" name="travellerid" placeholder="ID Number" />
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
    this.totalSeats = 10;
  }
  render() {
    const occupied = this.props.travellers.length;
    const free = this.totalSeats - occupied;
    const occupiedSeats = Array.from({ length: occupied }).map((_, idx) => (
      <button
        key={`occupied-${idx}`}
        style={{
          margin: '5px',
          width: '30px',
          height: '30px',
          border: 'none',
          backgroundColor: 'grey'
        }}
        disabled={true}
      ></button>
    ));
    const freeSeats = Array.from({ length: free }).map((_, idx) => (
      <button
        key={`free-${idx}`}
        style={{
          margin: '5px',
          width: '30px',
          height: '30px',
          border: 'none',
          backgroundColor: 'green'
        }}
      ></button>
    ));
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        {occupiedSeats}
        {freeSeats}
      </div>
    );
  }
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    this.setState((prev) => ({ travellers: [...prev.travellers, passenger] }));
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prev) => {
      const idx = this.state.travellers.findIndex(
        (traveller) => traveller.id === passenger
      );
      const updatedTravellers = prev.travellers.filter((_, i) => i !== idx);
      return { travellers: updatedTravellers };
    });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {
            /*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/
            [
              ['Homepage', 'Home'],
              ['displayTraveller', 'Display'],
              ['addTraveller', 'Add'],
              ['deleteTraveller', 'Delete']
            ].map((items, idx) => (
              <button key={idx} onClick={() => this.setSelector(items[0])}>
                {items[1]}
              </button>
            ))
          }
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}

          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 'Homepage' && (
            <Homepage travellers={this.state.travellers} />
          )}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 'displayTraveller' && (
            <Display travellers={this.state.travellers} />
          )}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 'addTraveller' && (
            <Add
              travellers={this.state.travellers}
              bookFunc={this.bookTraveller}
            />
          )}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 'deleteTraveller' && (
            <>
              <Delete deleteFunc={this.deleteTraveller} />
              <Display travellers={this.state.travellers} />
            </>
          )}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
