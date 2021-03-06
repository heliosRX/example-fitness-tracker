import heliosrx, { UIDMethod } from 'heliosrx';

import logModelDefinition from './log';
import groupModelDefinition from './group';
import groupMemberModelDefinition from './group-member';
import userModelDefinition from './user';
import userPublicModelDefinition from './user-public';
import exampleModelDefinition from './example';

export const group = new heliosrx.GenericStore(
  '/groups/*',
  groupModelDefinition
);

export const groupMember = new heliosrx.GenericStore(
  '/groups/{groupId}/members/*',
  groupMemberModelDefinition,
  // { uidMethod: UIDMethod.MY_USER_ID }
  // { key: UIDMethod.MEMBER_ID }
);

export const log = new heliosrx.GenericStore(
  '/groups/{groupId}/logs/*',
  logModelDefinition
);

export const user = new heliosrx.GenericStore(
  '/users_private/*',
  userModelDefinition,
  { uidMethod: UIDMethod.MY_USER_ID }
);

export const userPublic = new heliosrx.GenericStore(
  '/users_public/*',
  userPublicModelDefinition,
  { uidMethod: UIDMethod.MY_USER_ID }
);

export const example = new heliosrx.GenericStore(
  '/example/*',
  exampleModelDefinition,
);

/*
PWA
subsribe -> /group/{groupId}

/group/{groupId}/member/{userId}/tracking/{entryId} is TrackingItem {
  userId: X,
}
/group/{groupId}/member/{userId}/goals/{goalId} is Goal


SELECT * /group/{groupId}/tracking/{entryId}
/group/{groupId}/year/{year}/tracking/{entryId}

/user/{userId}/setting is User {
  nightMode: Boolean,
}

/user/{userId}/public is User {
  name: String,
  telegramUsername: String,
}

/group/{groupId} is GroupMeta {
  title:  String,
  unit: String,
  urlHash: String,
  matchRegex: String,
    // /^([0-9]+)\w+min*$/
    // /^([0-9]+)\w+(mm|cm)*$/
}

/group/{groupId}/tracking/{entryId} is TrackingItem {
  userId: UserId,
  value: Number,
  createdAt: ServerTimestamp,
}

/group/{groupId}/message/{messageId} is Message {
  userId: UserId,
  message: String,
  createdAt: ServerTimestamp,
}

// SELECT * /group/{groupId}/tracking/{entryId} ASC entry.createdAt LIMIT 100;

/group/{groupId}/member/{userId} is Member {
  role: String, // "admin", "member"
}
*/
