import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, FlatList, View, SafeAreaView, Platform } from "react-native";
import { themeProvide, twoOptionsAlertFunction } from "./globalMethods";
import {fonts} from '../../assets/fonts/fonts';
import CloseIconSVG from "../assets/svgs/CloseIconSVG";
import MyProfileSideMenu from "../assets/svgs/MyProfileSideMenuSvg";
import SalesmanSideMenuSvg from "../assets/svgs/SalesmanSideMenuSvg";
import WalletSideMenuSvg from "../assets/svgs/WalletSideMenuSvg";
import ReferFriendMenuSvg from "../assets/svgs/ReferFriendMenuSvg";
import LogoutMenuSvg from "../assets/svgs/LogoutMenuSvg";
import I18n from '../localization';
import {doLogout,setLoggedIn,doClearSession,doSaveUser,doSaveToken} from '../screens/Login/Action';
import {connect} from 'react-redux';
import Loader from '../common/loader/Loader';
const SideMenuData = [{
    title: I18n.t('myProfile_menu'),
    key: 'profile',
    icon: (<MyProfileSideMenu/>),
    id: 1
},
{
    title: I18n.t('salesman_menu'),
    key: 'salesman',
    icon: (<SalesmanSideMenuSvg/>),
    id: 2
},
{
    title:  I18n.t('wallet_menu'),
    key: 'wallet',
    icon: (<WalletSideMenuSvg/>),
    id: 3
},
{
    title: I18n.t('refer_a_friend_menu'),
    key: 'refer',
    icon: (<ReferFriendMenuSvg/>),
    id: 4
},
{
    title: I18n.t('logout_menu'),
    key: 'logout',
    icon: (<LogoutMenuSvg/>),
    id: 5
}
]

 function CustomDrawerContent(props) {

    const [menuTitle, setMenuTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    function onMenuPressed(flag: string) {
        setMenuTitle(flag)
        if(flag != 'logout'){
            props.navigation.closeDrawer();
        }
        
        switch (flag) {
            case 'profile':
                props.navigation.navigate('ProfileScreen')
                break;
            case 'salesman':
                props.navigation.navigate('SalesmanScreen')
                break;
                case 'wallet':
                    props.navigation.navigate('WalletScreen')
                break;
                case 'refer':
                // navigation.navigate(flag)
                break;
                case 'logout':
                // navigation.navigate(flag)
                twoOptionsAlertFunction( I18n.t('logoutText'), ()=>{
                    setIsLoading(true);
                        props.doLogout({
                            paramData:{'device_type':Platform.OS,'device_token':''},
                            onSuccess : (isSuccess,status,data) =>{
                                console.log('data',data);
                                setIsLoading(false);
                                    // if(isSuccess){
                                    //     props.setLoggedIn(false);
                                    //     props.doSaveUser(null);
                                    // }
                                    
                                    props.setLoggedIn(false);
                                    props.doSaveToken(false);
                                        props.doSaveUser(null);
                                        props.doClearSession(null);
                                       
                            }
                        })
                });
                break;
            default:
                break;
        }
    }

    const renderMenuHeader = () =>{
        return (<View style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={styles.menuText}>{I18n.t('menu_header_text')}</Text>
        <TouchableOpacity onPress={()=>{
            props.navigation.closeDrawer();
        }}>
        <CloseIconSVG/>
        </TouchableOpacity>
        </View>)
    }

const renderMenuList = () =>{
    return (<FlatList
        automaticallyAdjustContentInsets={true}
        data={SideMenuData}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item, index }) =>

            <TouchableOpacity  
               onPress={() => onMenuPressed(item.key)}>
                <View style={{  marginVertical: 12,alignItems:'center', flexDirection:'row'}}>
                    <>{item.icon}</>
                    <Text style={[styles.titleText, { color: menuTitle === item.key ? themeProvide().activeIconColor:'black'}]}>{item.title}</Text>
                </View>

            </TouchableOpacity>
        }
    />)
}    
const renderLineView = () =>{
return <View style={styles.lineView}/>
}
    return (
        <SafeAreaView>
            <View style={{paddingHorizontal:24}}>

            
           {renderMenuHeader()}
           {renderLineView()}
           {renderMenuList()}
           
            
            </View>
            <Loader
        loading={isLoading}
        isTransparent={true}
        color={themeProvide().primary}
        size={32}
      />
        </SafeAreaView>
    );
}
const mapStateToProps = state => {
    return {
      LoginReducer: state.LoginReducer,
    };
  };
  
  const mapDispatchToProps = {
    doLogout: doLogout,
    doSaveUser: doSaveUser,
    setLoggedIn: setLoggedIn,
    doSaveToken: doSaveToken,
    doClearSession: doClearSession,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);
  
const styles = StyleSheet.create({
    titleText: {
        fontSize: 14,
        marginLeft:12,
        fontWeight: '500',
        textAlign: 'auto',
        fontFamily: fonts.InterRegular,
        flexShrink: 1
    },
    menuText: {
        fontSize: 24,
        fontWeight: '900',
        flex:1,
        fontFamily: fonts.InterRegular,
    },
    lineView: {
        height: 1,
        marginVertical: 16,
        backgroundColor: themeProvide().primary_back,
    }
})