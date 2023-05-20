import { View, Text } from 'react-native'
import React from 'react'
import Container from '@src/components/common/Container'
import HomeHeader from '@src/components/ui/HomeHeader/HomeHeader'
import TrendIcon from '@src/assets/images/trends_screen.svg'
import ResponsiveText from '@src/components/common/ResponseiveText'
import { wp } from '@src/components/common/Responsive'
const Trends = (props) => {
    return (
        <Container>
            <HomeHeader
                back
                backgroundColor={"white"}
                show={true}
                {...props}
                title={"My Trends"}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <TrendIcon />
                <ResponsiveText style={{ marginTop: wp(5) }}>Coming Soon</ResponsiveText>
            </View>

        </Container>
    )
}

export default Trends