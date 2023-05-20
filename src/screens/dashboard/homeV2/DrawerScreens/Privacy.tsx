import { View, Text } from 'react-native'
import React, { useState } from 'react'
import Container from '@src/components/common/Container'
import HomeHeader from '@src/components/ui/HomeHeader/HomeHeader'
import ResponsiveText from '@src/components/common/ResponseiveText'
import { wp } from '@src/components/common/Responsive'
import Fonts from '@src/theme/fonts'
import MRegisterUserApiService from '@src/services/MRegisterUserApiService'
import Loader from '@src/components/ui/loader/Loader'
interface PrivacyInterface {
    title: string;
    description: string
}
const Privacy = (props) => {
    const [data, setData] = useState<PrivacyInterface[]>([])
    const [loading, setLoading] = useState(false);
    React.useEffect(() => {
        fetchDetails();
    }, [props.navigation]);
    const fetchDetails = async () => {
        setLoading(true);
        const res = await MRegisterUserApiService.privacyPolicy()
        setData(res?.data?.data)
        setLoading(false);
        // console.log(res?.data.data, 'qqq')
    }
    return (
        <Container>
            <HomeHeader
                back
                backgroundColor={"white"}
                show={true}
                {...props}
                title={"Privacy and Security"}

            />
            <View style={{ paddingHorizontal: wp(8) }}>
                {data && data?.map((item, index) => {
                    return (
                        <View key={index}>
                            <ResponsiveText style={{ fontSize: 4.8, fontFamily: Fonts.ManropeBold, marginVertical: wp(3) }}>{item.title}</ResponsiveText>
                            <ResponsiveText style={{ fontSize: 3.2, lineHeight: 25 }}>
                                {item.description}</ResponsiveText></View>
                    )
                })}


            </View>
            <Loader visible={loading} />
        </Container>
    )
}

export default Privacy