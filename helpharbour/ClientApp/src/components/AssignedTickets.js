﻿import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';



const AssignedTickets = () => {
    // define the state variables
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [showTickets, setShowTickets] = useState(false); // Define the state variable to show or hide the tickets in a toggle manner

    useEffect(() => {
        // Redirect to the login page if the user is not logged in
        if (!isLoggedIn) {
            navigate('/');
        } else {
            fetchAssignedTickets();
        }
    }, [isLoggedIn, navigate]);

    // Implement the fetchAssignedTickets function to fetch the assigned tickets for the logged-in user
    const fetchAssignedTickets = async () => {
        try {
            const response = await fetch(`/api/ticket/assigned/${user.userID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                
                setTickets(data);
            } else {
                alert("Failed to fetch tickets");
            }
        } catch (error) {
            console.error("Failed to fetch assigned tickets:", error);
            alert("An error occurred while fetching tickets.");
        }
    };

    // Implement the toggleTickets function to show or hide the tickets
    const toggleTickets = () => {  
        setShowTickets(!showTickets);  // Toggle the showTickets state by default it is false meaning hidden
    };
  

    return (
        <Container>
            
            <Row>
                <Col>
                    {/* Display the assigned tickets with a toggle behaviour*/}
                    <h2>Assigned Tickets <strong><span style={{ cursor: "pointer", fontSize: '1rem', userSelect: 'none', color: 'blue', }} onClick={toggleTickets}>[{showTickets ? 'Hide' : 'Show'}]</span></strong></h2>  
                </Col>
            </Row>
            {showTickets && (
            <Row>
                <Col>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Urgency</th>
                                <th>SLA Expiry</th>
                                <th>Status</th>
                                <th>Date Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                             {/*Display the tickets in a table if there are any tickets*/}
                            {tickets.length > 0 ? (
                                tickets.map((ticket) => (
                                    // Display the ticket details in a table row except for resolved tickets
                                    ticket.status !== "Resolved" ? ( 
                                    <tr key={ticket.ticketID}>
                                        <th scope="row">{ticket.ticketID}</th>  {/* Displaying ticketID*/}
                                        <td>{ticket.title}</td>
                                        <td>{ticket.type}</td>
                                        <td>{ticket.description}</td>
                                        <td>{ticket.urgency}</td>
                                        <td>{new Date(ticket.slA_Expiry).toLocaleDateString()}</td>
                                        <td>{ticket.status}</td>
                                        <td>{new Date(ticket.createdDate).toLocaleDateString()}</td>
                                        <td>
                                            <Button color="primary" onClick={() => navigate(`/viewticket/${ticket.ticketID}`)}>View</Button>
                                        </td>
                                    </tr>) : null
                                ))
                            ) : (

                                /* Display a message if there are no tickets*/
                                <tr>
                                    <td colSpan="9" className="text-center">No tickets found</td>
                                </tr>
                            )}
                        </tbody>
                        </Table>

                </Col>
            </Row>
            )}

        </Container>
    );
};

export default AssignedTickets;

