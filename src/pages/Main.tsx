import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

interface Member {
    login: string;
    avatar_url: string;
}

const Main = () => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/members')
            .then(response => response.json()).then(data => {
                setMembers(data);
            });
    }, []);

    return (
        <FlatList
            contentContainerStyle={{ padding: 24 }}
            data={members}
            keyExtractor={member => member.login}
            renderItem={({ item: member }) => (
                <View>
                    <Image style={styles.image} source={{ uri: member.avatar_url }} />
                    <Text style={styles.member}>{member.login}</Text>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    image: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    member: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    }
});

export default Main;