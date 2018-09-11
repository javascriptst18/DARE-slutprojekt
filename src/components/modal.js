import React, { Component } from 'react';
import Modal from 'react-modal';
// import { connect } from 'react-redux';


export default class Test extends Component {
    state = {
        showModal: false
    }

    handleOpenModal = this.handleOpenModal.bind(this);
    handleCloseModal = this.handleCloseModal.bind(this);


    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Öppna Modal</button>
                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="En DARE har hittats!"
                >
                    <p>En DARE som matchar dina önskemål har hittats!</p>
                    <p>Klicka på "JA" för att acceptera utmaningen!</p>
                    <p>Väljer du att inte anta utmaningen så kommer du inte kunna söka någon ny DARE på 7 dagar</p>


                    <button onClick={this.handleCloseModal}>Acceptera DARE</button>
                    <button onClick={this.handleCloseModal}>Tacka Nej</button>

                </Modal>
            </div>
        );
    }
}