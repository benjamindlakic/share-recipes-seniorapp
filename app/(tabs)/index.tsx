import { Link } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const Page = () => {
    return (
        <View>
            <Link href={'/(modals)/login'}>Login</Link>
            <Link href={'/listing/25'}>Recipe Details</Link>
        </View>
    );
};

export default Page;