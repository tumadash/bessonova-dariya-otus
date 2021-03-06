import React, {useState} from 'react';
import {KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View,} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {TextInputGuest, Title} from "../components";
import {editGuest} from "../store/list/actions";


const AboutScreen = ({navigation, list, editGuest}) => {
    const id = navigation.getParam('id');
    let guest = list.filter(
        guest => guest.id === id
    )[0];
    const [aboutText, setAboutText] = useState(guest.about);
    const save = () => {
        const {name, id, isChecked} = guest;
        editGuest({name, id, isChecked, about: aboutText});
    };
    const goMain = () => {
        navigation.navigate('Main');
    };
    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior="position">
                <ScrollView keyboardShouldPersistTaps="always">
                    <View>
                        <Title>Гость: {guest.name}</Title>
                        <Button
                            buttonStyle={styles.guestButton}
                            icon={<Icon name="arrow-back" color="white"/>}
                            title="Назад"
                            onPress={goMain}
                        />
                        <TextInputGuest
                            value={aboutText}
                            onChangeText={setAboutText}
                            placeholder="Комментарий"
                            containerStyle={styles.guestTextInput}
                            multiline={true}
                            numberOfLines={10}
                            onBlur={save}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    guestTextInput: {
        marginBottom: 20
    },
    guestButton: {
        width: 100,
        marginBottom: 10
    }
});

const mapStateToProps = state => ({
    list: state.list
});

const mapDispatchToProps = dispatch => ({
    editGuest: guest => dispatch(editGuest(guest)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AboutScreen);
