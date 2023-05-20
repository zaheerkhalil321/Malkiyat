import { View, Text } from 'react-native'
import React from 'react'
import Container from '@src/components/common/Container'
import HomeHeader from '@src/components/ui/HomeHeader/HomeHeader'

const Account = (props) => {
    return (
        <Container>
            <HomeHeader
                back
                backgroundColor={"white"}
                show={true}
                {...props}
                title={"Account"}
            />
        </Container>
    )
}

export default Account