import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
  Collapse,
  
} from "shards-react";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = {
      dropdownOpen: false,
      collapseOpen: false,
      countedResult:0,
      input1:0,
      input2:0,
      type: 'Sum',
    };
  }

  toggleDropdown() {
    this.setState({
      ...this.state,
      ...{
        dropdownOpen: !this.state.dropdownOpen
      }
    });
  }

  toggleNavbar() {
    this.setState({
      ...this.state,
      ...{
        collapseOpen: !this.state.collapseOpen
      }
    });
  }

  onChange = (event) => {
    let thisEntity = this;
    let value = 0;
    if(event.target.value.length>1)
      value = event.target.value.replace(/^0+/, '')
    else
      value = event.target.value
    
    this.setState({
      [event.target.name]: value,
    }, () => {
      thisEntity.countResult(this.state.type, parseInt(this.state.input1), parseInt(this.state.input2))
    })
  }

  countResult = (type, input1, input2) => {
    let result = 0
    if (type === 'Sum') 
      result = input1 + input2;
    else if (type === 'Multiply')
      result = input1 * input2;
    else if (type === 'Prime')
      result = this.firstPrimeNumber(input1)
    else if (type === 'Fibonacci')
      result =this.fibo(input1)
    this.setState({
      countedResult: result
    })
  }

    isPrime = (num) => {
      
      if (num <= 1) {
        return true
      } else if (num <= 3) {
        return true
      } else if (num%2 === 0 || num%3 === 0) {
        return false
      }
      let i = 5
      while (i*i <= num) {
        if (num%i === 0 || num%(i+2) === 0) {
          return false
        }
        i += 6
      }
      return true
}

firstPrimeNumber = (input) => {
        let primes=[];
        let count=0;
        let current=2;
        while(count<input){
          if(this.isPrime(current)){
            primes.push(current);
            count++;
          }
        current++;
        }
      return primes;
          
}

fibo = (input) => 
{
  if (input==2) 
  {
    return [0, 1];
  } 
  else if (input===0 || input===1 || !input){
    return [0]
  }
  else 
  {
    let fiboArr = this.fibo(input - 1);
    fiboArr.push(fiboArr[fiboArr.length - 1] + fiboArr[fiboArr.length - 2]);
    return fiboArr;
  }
};


onClickType = (type) => {
  let thisEntity = this;
  this.setState({type:type},
    ()=>thisEntity.countResult(this.state.type, parseInt(this.state.input1), parseInt(this.state.input2))
  )
}

  render() {
    return (
      <div>
      <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="#">Qwerty</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />

        <Collapse open={this.state.collapseOpen} navbar>
          <Nav navbar>
            <Dropdown
              open={this.state.dropdownOpen}
              toggle={this.toggleDropdown}
            >
              <DropdownToggle nav caret>
                Functions
              </DropdownToggle>
              <DropdownMenu>
                <a href="javascript:void(0)" onClick={()=> this.onClickType('Sum')}><DropdownItem>Sum</DropdownItem></a>
                <a href="javascript:void(0)" onClick={()=> this.onClickType('Multiply')}><DropdownItem>Multiply</DropdownItem></a>
                <a href="javascript:void(0)" onClick={()=> this.onClickType('Prime')}><DropdownItem>Prime</DropdownItem></a>
                <a href="javascript:void(0)" onClick={()=> this.onClickType('Fibonacci')}><DropdownItem>Fibonacci</DropdownItem></a>
              </DropdownMenu>
            </Dropdown>
          </Nav>

        </Collapse>
      </Navbar>

      <div style={{padding:"20px"}}>
         <InputGroup className="mb-2">
        <InputGroupAddon type="prepend">
          <InputGroupText>{this.state.type}</InputGroupText>
        </InputGroupAddon>
        <FormInput placeholder="Input 1" type="number" name="input1" onChange={this.onChange} value={this.state.input1} />
        <FormInput placeholder="Input 2" type="number" name="input2" onChange={this.onChange} value={(this.state.type==='Prime' || this.state.type === 'Fibonacci') ? '' : this.state.input2} 
        disabled={(this.state.type==='Prime' || this.state.type === 'Fibonacci') ? true : false }/>
        <FormInput placeholder="Result"  name="countedResult" value={this.state.countedResult} disabled={true} />
        </InputGroup>
      </div>

      
      </div>
    );
  }
}