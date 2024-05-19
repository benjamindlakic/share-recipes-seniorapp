import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import ProfileHeader from "@/components/ProfileHeader";
import { Link, Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";

const profile = () => {
  const router = useRouter();
  // const [firstName, setFirstName] = useState(user?.firstName);
  // const [lastName, setLastName] = useState(user?.lastName);

  // const onSaveUser = async () => {
  //   try {
  //     await user?.update({
  //       firstName: firstName!,
  //       lastName: lastName!,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const { signOut } = useAuth();

  // const doLogout = () => {
  //   signOut();
  // };

  // const { isSignedIn } = useAuth();
  const doLogout = () => {
    router.push("register");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <ProfileHeader />,
        }}
      />

      <Image source={{ uri: 'https://avatar.iran.liara.run/public/boy?username=Ash' }} style={styles.profileImage} />
      <Text style={{ textAlign: "center", fontFamily: "mon-sb", fontSize: 24 }}>
        Benjamin Dlakic
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statText}>2</Text>
          <Text style={styles.statLabel}>Recipes</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.divider}></Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>123</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.divider}></Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statText}>455</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
      </View>

      <Text style={styles.bioText}>
        I am a chef who loves to cook and share my recipes with the world.
      </Text>

      <View style={styles.buttonsContainer}>
        <Link href={"/(modals)/editProfile"} asChild>
          <TouchableOpacity style={styles.btnOutline}>
            <Text style={styles.btnOutlineText}>Edit Profile</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={styles.btnOutline} onPress={() => supabase.auth.signOut()} >
          <Text style={styles.btnOutlineText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  divider: {
    width: 1,
    height: 25,
    backgroundColor: Colors.primary,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  bioText: {
    marginTop: 15,
    fontSize: 18,
    lineHeight: 22,
    color: Colors.grey,
    fontFamily: "mon",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
    marginBottom: 10,
  },
  stat: {
    alignItems: "center",
  },
  statText: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  statLabel: {
    fontSize: 14,
    color: Colors.grey,
    fontFamily: "mon",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  btnOutline: {
    backgroundColor: "#D3D3D3",
    borderRadius: 32,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "mon",
  },
  textBtn: {
    color: Colors.grey,
    fontFamily: "mon",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});
