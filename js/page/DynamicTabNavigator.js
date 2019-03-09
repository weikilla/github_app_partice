/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import FavoritePage from './FavoritePage';
import MyPage from './MyPage';
import NavigationUtil from "../navigator/NavigationUtil";
import {BottomTabBar} from 'react-navigation-tabs'

//定义tab的总量
const TABS = {
    Popular: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons name={'whatshot'} size={26} style={{color: tintColor}}/>
            ),
        }
    },
    Trending: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons name={'md-trending-up'} size={26} style={{color: tintColor}}/>
            ),
        }
    },
    Favorite: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons name={'favorite'} size={26} style={{color: tintColor}}/>
            ),
        }
    },
    My: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor, focused}) => (
                <Entypo name={'user'} size={26} style={{color: tintColor}}/>
            ),
        }
    }
}
export default class DynamicTabNavigator extends Component<Props> {
    constructor(props) {
        super(props);
        // 取消黄色warning
        console.disableYellowBox = true;
    }

    _tabNavigator() {
        // 解构所有tabs
        const {Popular, Trending, Favorite, My} = TABS;
        // tabs表示要显示哪些tab，根据需要定制
        const tabs = {Popular, Trending, Favorite,My};
        //动态配置tab标签
        // Popular.navigationOptions.tabBarLabel = 'haha'
        return createAppContainer(createBottomTabNavigator(tabs,{
            tabBarComponent: tabBarComponent
        }))
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        const Tab = this._tabNavigator();
        return <Tab/>;
    }
}

class tabBarComponent extends React.Component{
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }

    }
    render(){
        const {routes, index} = this.props.navigation.state;
        if(routes[index].params){
            const {theme} = routes[index].params;
            //以最新的更新时间为主，防止被其他的tab之前的修改覆盖掉
            if(theme && theme.updateTime > this.theme.updateTime){
                this.theme = theme;
            }
        }
        // console.log("路由数组："+route);
        // console.log("第几个："+index);

        return <BottomTabBar
            {...this.props}
            activeTintColor = {this.theme.tintColor || this.props.activeTintColor}

        />

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});
