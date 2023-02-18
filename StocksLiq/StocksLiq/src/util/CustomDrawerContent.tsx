import React, { Component, useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, FlatList, View, SafeAreaView, Platform, BackHandler } from "react-native";
import { changeLanguage, isShowOwner, showMessageAlert, themeProvide, twoOptionsAlertFunction } from "./globalMethods";
import {fonts} from '../../assets/fonts/fonts';
import CloseIconSVG from "../assets/svgs/CloseIconSVG";
import MyProfileSideMenu from "../assets/svgs/MyProfileSideMenuSvg";
import SalesmanSideMenuSvg from "../assets/svgs/SalesmanSideMenuSvg";
import WalletSideMenuSvg from "../assets/svgs/WalletSideMenuSvg";
import ReferFriendMenuSvg from "../assets/svgs/ReferFriendMenuSvg";
import LogoutMenuSvg from "../assets/svgs/LogoutMenuSvg";
import I18n from '../localization';
import {doLogout,setLoggedIn,doClearSession,doSaveUser,doSaveToken} from '../screens/Login/Action';
import {doChangeLanguage} from '../screens/Profile/Action';
import {connect} from 'react-redux';
import Loader from '../common/loader/Loader';
import { API_LANG } from "../services/api_constants";
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import RNExitApp from 'react-native-exit-app';

 function CustomDrawerContent(props) {

    const SideMenuDataShopOwner = [{
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
const SideMenuDataSalesman = [{
    title: I18n.t('myProfile_menu'),
    key: 'profile',
    icon: (<MyProfileSideMenu/>),
    id: 6
},
{
    title: I18n.t('bhejan_menu'),
    key: 'bhejan',
    icon: (<MyProfileSideMenu/>),
    id: 7
},
{
    title: I18n.t('receivable_menu'),
    key: 'receivable',
    icon: (<MyProfileSideMenu/>),
    id: 8
},
{
    title: I18n.t('logout_menu'),
    key: 'logout',
    icon: (<LogoutMenuSvg/>),
    id: 9
}
]
    const [menuTitle, setMenuTitle] = useState('')
    const [language, setLanguage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const options = [
        { label: I18n.t('englishLang'), value: API_LANG.ENGLISH, testID: "english-lang", accessibilityLabel: "english-lang" },
        { label: I18n.t('hindiLang'), value: API_LANG.HINDI, testID: "hindi-lang", accessibilityLabel: "hindi-lang" },
      ];

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
                case 'bhejan':
                    props.navigation.navigate('BhejanScreen')
                break;
                case 'receivable':
                    props.navigation.navigate('RecievableScreen')
                break;
                case 'refer':
                    props.navigation.navigate('ReferFriendScreen')
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

    const callLang = async () =>{
        const language = await AsyncStorage.getItem('@user_language');
        setTimeout(() => {
            setLanguage(language ?? API_LANG.ENGLISH)
        }, 1000);
        
    }
    useFocusEffect(() => {
        callLang(); 
        console.log('en',language);
      });
    
    const renderMenuHeader = () =>{
        return (<View style={{flexDirection:'row',alignItems:'center', marginTop:16}}>
        <Text style={styles.menuText}>{I18n.t('menu_header_text')}</Text>
        <TouchableOpacity onPress={()=>{
            props.navigation.closeDrawer();
        }}>
        <CloseIconSVG/>
        </TouchableOpacity>
        </View>)
    }

    const goBack = () =>{
        RNExitApp.exitApp();
    }
    const onChangeLang = (value) =>{
        if(value !== language){
            setIsLoading(true);
                props.doChangeLanguage({
                    paramData:{lang_code:value},
                    onSuccess : (isSuccess,status,data) =>{
                        try {
                            setIsLoading(false);
                            if(isSuccess){
                                AsyncStorage.setItem('@user_language',value);
                                showMessageAlert(I18n.t('restartApp'),()=>{
                                   Platform.OS === 'android' ? BackHandler.exitApp() : goBack();
                                   changeLanguage(value);
                                });
                            } 
                        } catch (error) {
                            setIsLoading(false);
                        }
                        
                               
                    }
                })
        }
    }
    const renderChangeLanguage = () =>{
        return (<View style={{flexDirection:'row',alignItems:'center', marginTop:16}}>
        <Text style={styles.langText}>{I18n.t('language')}</Text>
        <TouchableOpacity onPress={()=>{
            props.navigation.closeDrawer();
        }}>
        <SwitchSelector
  options={options}
  initial={language === API_LANG.ENGLISH ? 0 : 1}
  style={{width:120}}
  textColor={themeProvide().primary} //'#7a44cf'
  selectedColor={themeProvide().white}
  buttonColor={themeProvide().primary}
  borderColor={themeProvide().primary}
  hasPadding
  onPress={(value: any) => onChangeLang(value)}
/>
        </TouchableOpacity>
        </View>)
    }    
const renderMenuList = () =>{
    return (<FlatList
        automaticallyAdjustContentInsets={true}
        data={isShowOwner() ? SideMenuDataShopOwner : SideMenuDataSalesman}
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
           {renderChangeLanguage()}
           
            
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
    doChangeLanguage:doChangeLanguage
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
    langText: {
        fontSize: 18,
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