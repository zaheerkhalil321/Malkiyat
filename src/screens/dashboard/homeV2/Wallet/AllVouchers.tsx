import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Container from '@src/components/common/Container'
import HomeHeader from '@src/components/ui/HomeHeader/HomeHeader'
import ResponsiveText from '@src/components/common/ResponseiveText'
import { wp } from '@src/components/common/Responsive'
import Fonts from '@src/theme/fonts'
import Content from '@src/components/common/Content'
import { store } from "@src/redux/store";
import MRegisterUserApiService from '@src/services/MRegisterUserApiService'
import HomeIcon from "@src/assets/images/home_i.svg";
import Loader from '@src/components/ui/loader/Loader'
import NoSqftIcon from "@src/assets/images/no_sqft.svg";
interface VoucherInterface {
    active: boolean
    amount: number
    challanNo: string
    paid: boolean
    paymentName: string
    iconUrl: string
}
const AllVouchers = (props) => {
    const [loader, setLoading] = useState(false);
    const [data, setData] = useState<VoucherInterface[]>([])

    React.useEffect(() => {
        (async () => {
            setLoading(true)
            const res = await MRegisterUserApiService.getAllVouchers(Number(
                store.getState()?.registerUser?.registerUserData?.userInfo?.userId!
            ))
            setData(res?.data.data)
            console.log(res?.data.data, '............')
            setLoading(false)
        })()
    }, [props.navigation]);
    return (
        <Container>
            <HomeHeader
                back
                backgroundColor={"white"}
                show={true}
                {...props}
                title={"Vouchers"}
            />
            {
                data && data?.length == 0 &&
                <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
                    <NoSqftIcon />
                    <ResponsiveText style={{ marginTop: wp(5) }}>No Voucher Available</ResponsiveText>
                </View>
            }


            <Content style={{ marginVertical: wp(3), marginHorizontal: wp(3) }}>
                {data && data?.map((item, index) => {
                    return (
                        <View key={index} style={{
                            borderWidth: 1, borderColor: '#FAAD39', padding: wp(3), borderRadius: 8, marginBottom: wp(4),
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.20,
                            shadowRadius: 1.41,

                            elevation: 2,
                            backgroundColor: 'white'
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ResponsiveText>Voucher ID</ResponsiveText>
                                <ResponsiveText>Amount</ResponsiveText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                                <ResponsiveText style={{ fontSize: 4.5, fontFamily: Fonts.ManropeSemiBold }}>{item?.challanNo}</ResponsiveText>
                                <ResponsiveText style={{ fontSize: 4.5, fontFamily: Fonts.ManropeSemiBold }}>Rs. {item?.amount}</ResponsiveText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image style={{ width: wp(5), height: wp(5), marginRight: 7 }} source={{ uri: item.iconUrl }} />
                                    <ResponsiveText style={{ fontSize: 4, fontFamily: Fonts.ManropeSemiBold }}>{item?.paymentName}</ResponsiveText>
                                </View>

                                {
                                    item?.paid == true ? <ResponsiveText style={{ alignSelf: 'flex-end', fontFamily: Fonts.ManropeBold, color: '#27AE60' }}>Paid</ResponsiveText> : <ResponsiveText style={{ alignSelf: 'flex-end', fontFamily: Fonts.ManropeBold, color: '#DB1A00' }}>Unpaid</ResponsiveText>
                                }
                            </View>


                        </View>
                    )
                })}

            </Content>
            <View
                style={{
                    paddingHorizontal: wp(4),
                    paddingVertical: wp(4),
                    borderTopColor: "#EEEEEE",
                    borderTopWidth: 1,
                    // flexDirection: "row",
                    // justifyContent: "space-between",
                }}
            >
                <TouchableOpacity
                    onPress={() => props.navigation.push("HomeDrawer")}
                    style={{
                        // width: wp(43.73),
                        height: wp(14.93),
                        borderRadius: wp(10),
                        backgroundColor: "#2BACE3",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >

                    <ResponsiveText
                        style={{
                            color: "white",
                            fontFamily: Fonts.ManropeBold,
                            fontSize: 4.53,
                            marginRight: 5,
                        }}
                    >
                        Go to home
                    </ResponsiveText>
                    <HomeIcon />
                </TouchableOpacity>
            </View>
            <Loader visible={loader} />
        </Container>
    )
}

export default AllVouchers