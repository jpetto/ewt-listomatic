import React from 'react';

export var AddNoteForm = React.createClass({
    propTypes: {
        addNote: React.PropTypes.func.isRequired
    },
    createNote: function(e) {
        e.preventDefault();

        // TODO: use ListItems code as a guide to complete adding
        // a note to the ListManager's state
    },
    render: function() {
        return (
            <form className="note-edit" ref="noteForm" onSubmit={ this.createNote }>
                <textarea ref="content"></textarea>

                <button className="btn" type="submit">+ Add Note</button>
            </form>
        )
    }
});

export var ListNotes = React.createClass({
    propTypes: {
        notes: React.PropTypes.object.isRequired
    },
    // key is passed automatically from the 'map' function called below
    renderNote: function(key) {
        // TODO: find note in props (passed down from ListManager state)

        // TODO: make sure note still exists (may have been deleted), then
        // return a new Note component
    },
    render: function() {
        // TODO: get the key of every note and store in an array

        return (
            <section className="list-notes">
                <h3>List Notes</h3>

                <ul className="notes">
                    {/* Run every note ID through the 'renderNote' function */}
                    {/* TODO: call 'renderNote' for each note */}
                </ul>

                {/* TODO: put the AddNoteForm component here */}
            </section>
        )
    }
});
