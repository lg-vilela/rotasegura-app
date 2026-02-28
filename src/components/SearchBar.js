import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import COLORS from '../constants/colors';

const SearchBar = ({ value, onChangeText, onSubmit }) => {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="magnify" size={24} color={COLORS.textSecondary} style={styles.icon} />
            <TextInput
                placeholder="Para onde vamos?"
                placeholderTextColor={COLORS.textSecondary}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
                returnKeyType="search"
            />
            <TouchableOpacity style={styles.voiceButton}>
                <MaterialCommunityIcons name="microphone" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.profileButton}>
                <View style={styles.avatarPlaceholder}>
                    <MaterialCommunityIcons name="account" size={20} color={COLORS.textSecondary} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(30, 41, 59, 0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 30,
        height: 54,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        color: COLORS.text,
        fontSize: 16,
        height: '100%',
    },
    voiceButton: {
        padding: 5,
    },
    divider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 10,
    },
    avatarPlaceholder: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#334155',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    }
});

export default SearchBar;
