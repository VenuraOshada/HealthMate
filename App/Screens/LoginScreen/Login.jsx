import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../../hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {

        useWarmUpBrowser();
        const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
        const onPress = React.useCallback(async () => {
            try {
              const { createdSessionId, signIn, signUp, setActive } =
                await startOAuthFlow();
         
              if (createdSessionId) {
                setActive({ session: createdSessionId });
              } else {
                // Use signIn or signUp for next steps such as MFA
              }
            } catch (err) {
              console.error("OAuth error", err);
            }
          }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>HealthMate</Text>
            <Text style={styles.subtitle}>Building Bridges to a Healthier You</Text>
            
            
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={{textAlign:'center',fontSize:20}}>      Sign In     </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontSize: 40, // Adjust font size as needed
        fontWeight: "bold", // Make the text bold
        marginBottom: 8 // Add some spacing between title and subtitle
    },
    subtitle: {
        fontSize: 16, // Adjust font size as needed
        marginBottom: 20
    },                                    
    loginImage:{
        width:100,
        height:200,
        marginBottom: 20
    },
    button:{
        padding:15,
        backgroundColor:'#b2f5f7',
        borderRadius:99

    }

});
