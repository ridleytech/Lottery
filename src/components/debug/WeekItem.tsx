import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';

const theme = getTheme();

const styles = StyleSheet.create({
    card1: {
        marginTop: 10,
        left: 15,
        height: 70,
        borderBottomColor: "gray",
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: Dimensions.get('window').width
    },
    exercise1: {
        marginTop: 0,
        fontSize: 18,
        color: "#333333",
        fontFamily: "Avenir Heavy"
    },
    lift1: {
        fontSize: 16,
        top: 10,
        color: "#333333",
        fontFamily: "Avenir Book"
    }
});

const WeekItem = (props) => {
    return (
        <TouchableWithoutFeedback 
            onPress={() => props.selectAccount(props.lifts)}>
        <View style={styles.card1}>
            <Text style={styles.exercise1} >{props.lifts.exercise}</Text>
            <Text style={styles.lift1} >{props.lifts.lifts}</Text>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default connect(null, actions)(WeekItem);
