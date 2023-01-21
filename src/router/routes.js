import HomeView from "../views/HomeView.vue";
import ConversationListView from "../views/ConversationListView.vue";
import ConversationItemView from "../views/ConversationItemView.vue";
import ProfileItemView from "../views/ProfileItemView.vue";
import FriendListView from "../views/FriendListView.vue";
import FriendRequestListView from "../views/FriendRequestListView.vue";
import ParticipantListView from "../views/ParticipantListView.vue";
import ParticipantEditView from "../views/ParticipantEditView.vue";
import ParticipantCreateView from "../views/ParticipantCreateView.vue";
import ConversationMediaView from "../views/ConversationMediaView.vue";
import ConversationEditView from "../views/ConversationEditView.vue";
import ConversationCreateView from "../views/ConversationCreateView.vue";
import MessageListView from "../views/MessageListView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import SearchView from "../views/SearchView.vue";
import EditProfileView from "../views/EditProfileView.vue";
import PrivacyPolicyView from "../views/PrivacyPolicyView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      needAuth: false,
      canBeAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      needAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      needAuth: false,
    },
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
    meta: {
      needAuth: false,
      canBeAuth: true,
    },
  },
  {
    path: "/privacypolicy",
    name: "privacy-policy",
    component: PrivacyPolicyView,
    meta: {
      needAuth: false,
      canBeAuth: true,
    },
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
    meta: {
      needAuth: false,
      canBeAuth: true,
    },
  },
  {
    path: "/profiles/:userId(\\d+)",
    name: "profile-item",
    component: ProfileItemView,
    meta: {
      needAuth: false,
      canBeAuth: true,
    },
  },
  {
    path: "/profiles/:userId(\\d+)/friends",
    name: "friend-list",
    component: FriendListView,
    meta: {
      needAuth: false,
      canBeAuth: true,
    },
  },
  {
    path: "/profile/edit",
    name: "profile-edit",
    component: EditProfileView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/friendrequests",
    name: "friendrequest-list",
    component: FriendRequestListView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations",
    name: "conversation-list",
    component: ConversationListView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/:conversationId(\\d+)",
    name: "conversation-item",
    component: ConversationItemView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/:conversationId(\\d+)/messages",
    name: "message-list",
    component: MessageListView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/:conversationId(\\d+)/edit",
    name: "conversation-edit",
    component: ConversationEditView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/create",
    name: "conversation-create",
    component: ConversationCreateView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/:conversationId(\\d+)/medias",
    name: "conversation-media",
    component: ConversationMediaView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/:conversationId(\\d+)/participants",
    name: "participant-list",
    component: ParticipantListView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/:conversationId(\\d+)/participants/:participantId(\\d+)/edit",
    name: "participant-edit",
    component: ParticipantEditView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/conversations/:conversationId(\\d+)/participants/create",
    name: "participant-create",
    component: ParticipantCreateView,
    meta: {
      needAuth: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
    meta: {
      needAuth: false,
      canBeAuth: true,
    },
  },
];

const authRoutes = routes
  .filter((route) => route.meta.needAuth)
  .map((route) => route.name);
const unauthRoutes = ["login", "register"];

const canBeAuthRoutes = routes
  .filter((route) => !route.meta.needAuth && route.meta.canBeAuth)
  .map((route) => route.name);

export { routes, authRoutes, canBeAuthRoutes, unauthRoutes };
