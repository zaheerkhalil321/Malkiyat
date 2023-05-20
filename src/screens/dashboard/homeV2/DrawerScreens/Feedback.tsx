import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Container from '@src/components/common/Container'
import HomeHeader from '@src/components/ui/HomeHeader/HomeHeader'
import { wp } from '@src/components/common/Responsive'
import ResponsiveText from '@src/components/common/ResponseiveText'
import Fonts from '@src/theme/fonts'
import MRegisterUserApiService from '@src/services/MRegisterUserApiService'

const Feedback = (props) => {
    const [tabs, setTabs] = useState('error')

    return (
        <Container>
            <HomeHeader
                back
                backgroundColor={"white"}
                show={true}
                {...props}
                title={"Feedback"}

            />
            <View style={{ paddingHorizontal: wp(8), flex: 1 }}>

                <ResponsiveText style={{ fontSize: 4.8, fontFamily: Fonts.ManropeBold, marginVertical: wp(3), marginTop: wp(5) }}>Select your feedback category</ResponsiveText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: wp(2), marginTop: wp(3) }}>
                    <TouchableOpacity
                        onPress={() => {
                            setTabs('error')
                        }}
                        style={{ borderWidth: 1, borderColor: '#2BACE3', backgroundColor: tabs == 'error' ? '#2BACE3' : 'white', width: wp(36.8), height: wp(12.8), borderRadius: wp(2), justifyContent: 'center', alignItems: 'center' }}>
                        <ResponsiveText style={{ color: tabs == 'error' ? 'white' : 'black' }}>Error Message</ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setTabs('sug')
                        }}
                        style={{ borderWidth: 1, borderColor: '#2BACE3', width: wp(36.8), height: wp(12.8), borderRadius: wp(2), justifyContent: 'center', alignItems: 'center', backgroundColor: tabs == 'sug' ? '#2BACE3' : 'white' }}>
                        <ResponsiveText style={{ color: tabs == 'error' ? 'black' : 'white' }}>Suggestion</ResponsiveText>
                    </TouchableOpacity>
                </View>
                <ResponsiveText style={{ fontSize: 4.8, fontFamily: Fonts.ManropeBold, marginVertical: wp(3), marginTop: wp(8) }}>Type your feedback here</ResponsiveText>
                <TextInput multiline={true} placeholder='Your message here.' style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.20,
                    shadowRadius: 1.41,
                    elevation: 2,
                    backgroundColor: 'white',
                    height: wp(50),
                    borderRadius: wp(5),
                    paddingHorizontal: wp(5),
                }} />
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{ backgroundColor: '#2BACE3', position: 'absolute', bottom: 0, width: wp(84), height: wp(12.27), borderRadius: wp(10), justifyContent: 'center', alignItems: 'center' }}>
                        <ResponsiveText style={{ color: 'white' }}>Send Feedback</ResponsiveText>
                    </TouchableOpacity>
                </View>

            </View>
        </Container>
    )
}

export default Feedback