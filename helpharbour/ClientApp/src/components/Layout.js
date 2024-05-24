import React, { Component } from 'react';       // importing the Component class from the react module
import { Container } from 'reactstrap';         // importing the Container component from the reactstrap module
import NavMenu from './NavMenu';                // accessing the NavMenu component after converting to functional component

export class Layout extends Component {
  static displayName = Layout.name;

    render() {
        const containerStyle = {
            border: '1px solid #dee2e6',            // Example border: solid, 1px, with a light grey color
            padding: '0.5rem'                       // Optional: to ensure there's some space inside the container
        };

    return (
      <div>
        <NavMenu />
            <Container style={containerStyle}>
                {this.props.children}               {/* Render the child components, part of the default template generated by Visual Studio */}
            </Container>
      </div>
    );
  }
}
