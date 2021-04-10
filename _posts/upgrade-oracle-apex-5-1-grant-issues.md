---
title: 'Upgrade Oracle APEX 5.1 – Grant Issues'
excerpt: 'Many of us have upgraded or are planning an upgrade to the all new Oracle APEX 5.1 to give a shot at all the new amazing features, the refined Universal Theme, JET charts, the...'
coverImage: '/assets/blog/upgrade-oracle-apex-5-1/cover.png'
date: '2017-03-01T05:35:07.322Z'
author:
  name: Farzad Soltani
  picture: '/assets/blog/authors/farzad.jpeg'
ogImage:
  url: '/assets/blog/upgrade-oracle-apex-5-1/cover.png'
---

Many of us have upgraded or are planning an upgrade to the all new Oracle APEX 5.1 to give a shot at all the new amazing features, the refined Universal Theme, JET charts, the super duper Interactive Grid and so on.

![APEX 5.1](/assets/blog/upgrade-oracle-apex-5-1/1.png)

Throughout the process of this upgrade, lots of issues have risen such as zero-downtime upgrades, plugins breaking, custom CSS needing re-modification. All of these issues have their own solutions and/or workarounds.

One of the problems that I ran into today and want to share is that I upgraded 5.0 to 5.1 manually. That means I ran these three scripts one after another:

```bash
@apexins1.sql
@apexins2.sql
@apexins3.sql
```

**Note:** I stopped my **ORDS** deployment before starting the 3rd script. (It takes less than a minute to complete successfully)

Now, what happened in my case was that I didn’t drop the APEX_050000 user for some internal reasons but I realized some issues especially when exporting and importing applications between different environments and Workspace IDs being switched to other values.

Doing a lot of debugging and mainly checking the **APEX_ADMINISTRATOR_ROLE** role, I noticed the two grants below:

```sql
GRANT EXECUTE ON APEX_050000.WWV_FLOW_INSTANCE_ADMIN
TO APEX_ADMINISTRATOR_ROLE;

GRANT SELECT ON APEX_050000.WWV_FLOW_PRIVATE_TO_ADMIN
TO APEX_ADMINISTRATOR_ROLE;
```

Therefore the **APEX_050000** user was doing some internal functions instead of the newly created **APEX_050100** user (I don’t know why it didn’t raise any errors and compatibility warnings though). So what’s the solution? Simple! Revoke those GRANTS and you’re back on track.

```sql
REVOKE EXECUTE ON APEX_050000.WWV_FLOW_INSTANCE_ADMIN
FROM APEX_ADMINISTRATOR_ROLE;

REVOKE SELECT ON APEX_050000.WWV_FLOW_PRIVATE_TO_ADMIN
FROM APEX_ADMINISTRATOR_ROLE;
```

I highly recommend dropping the **APEX_050000** user after you’ve upgraded to 5.1 as there might be more unanticipated problems. (I highly appreciate comments on this last statement)

There are more problems I’ve also ran into mostly including Themes. Most of the applications developed in my scenario all had legacy themes as their base theme and ever since they’ve been deprecated we’ve felt the need to change a lot of parts (even though we had tested for a couple of weeks before going through the actual upgrade). Hopefully I will post more on these topics in the upcoming weeks.

## Conclusion

Lots of people might think I’m discouraging users to not upgrade to 5.1 but that’s not the point at all. It’s quite the opposite. Upgrading the core itself to 5.1 and eventually themes to UT (Universal Theme) is an inevitable step in keeping applications consistent with the ongoing technological and web design advances we are going through daily. All I’m saying is that it should be well planned and thought through thoroughly. There are lots of good blogs out there providing life-saving and time-consuming solutions, I hope this post also directs you in the same direction.
