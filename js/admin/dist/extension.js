System.register('hyn/guardian/addGuardianPane', ['flarum/extend', 'flarum/components/AdminNav', 'flarum/components/AdminLinkButton', 'hyn/guardian/components/GuardianPage'], function (_export) {
  'use strict';

  var extend, AdminNav, AdminLinkButton, GuardianPage;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsAdminNav) {
      AdminNav = _flarumComponentsAdminNav['default'];
    }, function (_flarumComponentsAdminLinkButton) {
      AdminLinkButton = _flarumComponentsAdminLinkButton['default'];
    }, function (_hynGuardianComponentsGuardianPage) {
      GuardianPage = _hynGuardianComponentsGuardianPage['default'];
    }],
    execute: function () {
      _export('default', function () {
        app.routes.guardian = { path: '/guardian', component: GuardianPage.component() };

        app.extensionSettings['hyn-guardian'] = function () {
          return m.route(app.route('guardian'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
          items.add('guardian', AdminLinkButton.component({
            href: app.route('guardian'),
            icon: 'user-secret',
            children: app.translator.trans('hyn-guardian.admin.nav.guardian_button'),
            description: app.translator.trans('hyn-guardian.admin.nav.guardian_text')
          }));
        });
      });
    }
  };
});;
System.register('hyn/guardian/components/GuardianPage', ['flarum/Component', 'flarum/components/Button', 'flarum/utils/humanTime', 'flarum/utils/ItemList', 'flarum/helpers/avatar', 'flarum/helpers/username', 'flarum/helpers/icon', 'flarum/components/UserBio', 'flarum/components/AvatarEditor', 'flarum/helpers/listItems'], function (_export) {

    //import EditTagModal from 'flarum/tags/components/EditTagModal';
    //import TagSettingsModal from 'flarum/tags/components/TagSettingsModal';
    //import tagIcon from 'flarum/tags/helpers/tagIcon';
    //import sortTags from 'flarum/tags/utils/sortTags';

    'use strict';

    var Component, Button, humanTime, ItemList, avatar, username, icon, UserBio, AvatarEditor, listItems, GuardianPage;
    function userItem(user) {

        return m(
            'tr',
            { 'data-id': user.id(), className: 'PermissionGrid-child' },
            m(
                'th',
                null,
                m(
                    'a',
                    { href: app.forum.attribute('baseUrl') + "/u/" + user.username() },
                    user.username()
                )
            ),
            m(
                'td',
                null,
                humanTime(user.joinTime())
            ),
            m(
                'td',
                null,
                humanTime(user.lastSeenTime())
            ),
            m(
                'td',
                null,
                user.badges().toArray().length ? m(
                    'ul',
                    { className: 'UserCard-badges badges' },
                    listItems(user.badges().toArray())
                ) : ''
            )
        );
    }

    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent['default'];
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton['default'];
        }, function (_flarumUtilsHumanTime) {
            humanTime = _flarumUtilsHumanTime['default'];
        }, function (_flarumUtilsItemList) {
            ItemList = _flarumUtilsItemList['default'];
        }, function (_flarumHelpersAvatar) {
            avatar = _flarumHelpersAvatar['default'];
        }, function (_flarumHelpersUsername) {
            username = _flarumHelpersUsername['default'];
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon['default'];
        }, function (_flarumComponentsUserBio) {
            UserBio = _flarumComponentsUserBio['default'];
        }, function (_flarumComponentsAvatarEditor) {
            AvatarEditor = _flarumComponentsAvatarEditor['default'];
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems['default'];
        }],
        execute: function () {
            GuardianPage = (function (_Component) {
                babelHelpers.inherits(GuardianPage, _Component);

                function GuardianPage() {
                    babelHelpers.classCallCheck(this, GuardianPage);
                    babelHelpers.get(Object.getPrototypeOf(GuardianPage.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(GuardianPage, [{
                    key: 'init',
                    value: function init() {
                        this.users = [];
                        this.sorting = 'username';
                        this.offset = 0;

                        this.queryList();
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'PermissionsPage container' },
                            m(
                                'table',
                                { className: 'PermissionGrid' },
                                m(
                                    'thead',
                                    null,
                                    m(
                                        'tr',
                                        null,
                                        m('td', null),
                                        m(
                                            'th',
                                            null,
                                            app.translator.trans('hyn-guardian.admin.grid.user.joined_at')
                                        ),
                                        m(
                                            'th',
                                            null,
                                            app.translator.trans('hyn-guardian.admin.grid.user.last_seen_at')
                                        ),
                                        m(
                                            'th',
                                            null,
                                            app.translator.trans('hyn-guardian.admin.grid.user.badges')
                                        )
                                    )
                                ),
                                m(
                                    'tbody',
                                    null,
                                    this.users.map(userItem)
                                )
                            ),
                            m(
                                'button',
                                { onclick: this.previousPage() },
                                'Previous'
                            ),
                            m(
                                'button',
                                { onclick: this.nextPage() },
                                'Next'
                            )
                        );
                    }
                }, {
                    key: 'queryList',
                    value: function queryList() {
                        var _this = this;

                        app.store.find('users', { sort: this.sorting, page: { limit: 50, offset: this.offset } }).then(function (users) {
                            _this.users = users;
                            m.redraw();
                        });
                    }
                }, {
                    key: 'previousPage',
                    value: function previousPage() {
                        this.offset--;
                        if (this.offset < 0) this.offset = 0;

                        //this.queryList();
                    }
                }, {
                    key: 'nextPage',
                    value: function nextPage() {
                        this.offset++;

                        //this.queryList();
                    }
                }]);
                return GuardianPage;
            })(Component);

            _export('default', GuardianPage);
        }
    };
});;
System.register('hyn/guardian/main', ['flarum/core/models/User', 'hyn/guardian/addGuardianPane'], function (_export) {
    'use strict';

    //import addTagsPermissionScope from 'flarum/tags/addTagsPermissionScope';
    //import addTagPermission from 'flarum/tags/addTagPermission';
    var User, addGuardianPane;
    return {
        setters: [function (_flarumCoreModelsUser) {
            User = _flarumCoreModelsUser['default'];
        }, function (_hynGuardianAddGuardianPane) {
            addGuardianPane = _hynGuardianAddGuardianPane['default'];
        }],
        execute: function () {

            app.initializers.add('hyn-guardian', function (app) {
                //addTagsPermissionScope();
                //addTagPermission();
                addGuardianPane();
            });
        }
    };
});