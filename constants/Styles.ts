import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fdffff',
    },
    inputField: {
        height: 44,
        borderColor: '#ABABAB',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    btn: { 
        backgroundColor: Colors.primary,
        borderRadius: 8,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'mon-b',
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopColor: Colors.grey,
        borderTopWidth: StyleSheet.hairlineWidth,
    },
 });