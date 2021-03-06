import React, {Component, PropTypes} from 'react';
import HTML from '../../utils/html-helper';
import Icon from '../../components/icon';
import App from '../../core';
import Chat from '../../core/models/chat';
import {UserAvatar} from '../common/user-avatar';
import replaceViews from '../replace-views';

const chatIcons = {
    group: {name: 'comment-multiple-outline', colorClass: 'text-info'},
    'public-group': {name: 'pound-box', colorClass: 'text-green'},
    'system-group': {name: 'comment-text', colorClass: 'text-primary'}
};

class ChatAvatar extends Component {
    static defaultProps = {
        chat: null,
        grayOffline: false,
        className: null,
        avatarSize: null,
        iconSize: null,
        avatarClassName: null,
        iconClassName: null,
    };

    static propTypes = {
        chat: PropTypes.instanceOf(Chat),
        grayOffline: PropTypes.bool,
        className: PropTypes.string,
        avatarSize: PropTypes.number,
        iconSize: PropTypes.number,
        avatarClassName: PropTypes.string,
        iconClassName: PropTypes.string,
    };

    static get ChatAvatar() {
        return replaceViews('chats/chat-avatar', ChatAvatar);
    }

    render() {
        const {
            chat,
            grayOffline,
            className,
            avatarSize,
            iconSize,
            avatarClassName,
            iconClassName,
            ...other
        } = this.props;


        if (chat.isOne2One) {
            const theOtherOne = chat.getTheOtherOne(App);
            const grayscale = grayOffline && (theOtherOne.isOffline || !App.profile.isUserOnline);
            return <UserAvatar size={avatarSize} user={theOtherOne} className={HTML.classes(className, avatarClassName, {grayscale})} {...other} />;
        }
        let icon = null;
        if (chat.isSystem) {
            icon = chatIcons['system-group'];
        } else if (chat.public) {
            icon = chatIcons['public-group'];
        } else {
            icon = chatIcons.group;
        }
        return <Icon size={iconSize} name={`${icon.name} icon-2x`} className={HTML.classes(className, iconClassName, icon.colorClass)} {...other} />;
    }
}

export default ChatAvatar;
