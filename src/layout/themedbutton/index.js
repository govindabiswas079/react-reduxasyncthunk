// ThemedButton.js
import React from 'react';
import { connect } from 'react-redux';
import { toggleTheme } from './themeSlice';

class ThemedButton extends React.Component {
    render() {
        const { theme, toggleTheme } = this.props;

        return (
            <button
                style={{
                    backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
                    color: theme === 'light' ? '#000000' : '#ffffff'
                }}
                onClick={toggleTheme}
            >
                Toggle Theme
            </button>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.theme.value
});

// const mapDispatchToProps = { toggleTheme };

const mapDispatchToProps = dispatch => ({
    toggleTheme: () => dispatch(toggleTheme())
});


export default connect(mapStateToProps, mapDispatchToProps)(ThemedButton);
