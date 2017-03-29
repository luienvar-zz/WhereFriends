import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    Image,
    StyleSheet,
} from 'react-native';

class Home extends React.Component {
    render() {
        console.log(this.props.navigation.state.params.user)
        const { params } = this.props.navigation.state;
        return (
            <View style={styles.container}>
                <Text 
                    style={styles.text}>
                    Welcome {params.user.name}
                </Text>
                <Image source={{uri: params.user.picture.data.url}} style={styles.imagen}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3399FF',
    },
    text: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#FFFFFF',
    },
    imagen: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderRadius: 50,
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
    },
});



export default Home;