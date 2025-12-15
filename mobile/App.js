import React from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { CATEGORIES, companies, posts as initialPosts } from "./src/mockData";
import { getCategoryLabel, getPostById, listPostsForCompany } from "./src/gossip";
import { moderatePost } from "./src/moderation";
import { COUNTRIES, INDUSTRIES } from "./src/insightsData";
import { generateBasicInsights } from "./src/insights";
import { clearProfile, defaultProfile, loadProfile, saveProfile } from "./src/profileStore";
import { getOrCreateClientKey } from "./src/clientKeyStore";
import {
  Alert,
  Body,
  BodyStrong,
  ButtonDanger,
  ButtonGhost,
  ButtonPrimary,
  ButtonSecondary,
  Caption,
  Card,
  Chip,
  Display,
  Divider,
  EmptyState,
  H1,
  H2,
  Micro,
  P,
  Pill,
  Screen,
  Small,
  TextInput as UITextInput,
  tokens,
  theme,
} from "./src/ui";

/**
 * Milestones 2–6 (Phase 1 MVP scope):
 * - Anonymous company gossip (read + post)
 * - Basic future jobs insights + minimal personalization
 * - Essential moderation (allow/hold/block + report + admin review)
 *
 * Explicitly NOT implemented:
 * - Accounts
 * - Voting
 * - Reputation
 * - Advanced AI scenarios
 */

function todayIsoDate() {
  // Day-level date only (privacy-friendly).
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function randomAnonLabel() {
  // Non-persistent per-post label. Not a username. Not linkable across posts.
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
  return `Anonymous ${suffix}`;
}

function SectionTitle({ children }) {
  return (
    <H2 style={{ marginBottom: tokens.spacing[12] }}>
      {children}
    </H2>
  );
}

function BackHeader({ title, onBack }) {
  return (
    <View
      style={{
        paddingHorizontal: tokens.spacing[16],
        paddingTop: tokens.spacing[12],
        paddingBottom: tokens.spacing[12],
        backgroundColor: tokens.color.background,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            style={{
              paddingVertical: tokens.spacing[8],
              paddingRight: tokens.spacing[16],
              paddingLeft: 6,
              marginLeft: -6,
            }}
          >
            <BodyStrong style={{ color: tokens.color.primary600 }}>
              ← Back
            </BodyStrong>
          </Pressable>
        ) : null}
        <H2>{title}</H2>
      </View>
      <Caption style={{ marginTop: tokens.spacing[8] }}>
        Anonymous by default. No usernames. No accounts.
      </Caption>
    </View>
  );
}

function CompanyListScreen({ onSelect }) {
  const [query, setQuery] = React.useState("");
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ 
          paddingHorizontal: tokens.spacing[16], 
          paddingTop: tokens.spacing[16], 
          paddingBottom: tokens.spacing[16] 
        }}>
          <Display style={{ marginBottom: tokens.spacing[8] }}>
            Anonymous Company Reviews
          </Display>
          <P style={{ marginBottom: tokens.spacing[16] }}>
            Anonymous, community-led insights.
          </P>
          <UITextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search a company"
            autoCapitalize="none"
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ 
            paddingHorizontal: tokens.spacing[16], 
            paddingBottom: 90 
          }}
          renderItem={({ item }) => (
            <Card 
              onPress={() => onSelect(item)}
              style={{ marginBottom: tokens.spacing[12] }}
            >
              <H2>{item.name}</H2>
              <Caption style={{ marginTop: tokens.spacing[8] }}>
                Tap to browse categories and threads
              </Caption>
            </Card>
          )}
          ListEmptyComponent={
            <View style={{ paddingTop: tokens.spacing[16] }}>
              <Caption>No companies match that search.</Caption>
            </View>
          }
        />
      </SafeAreaView>
    </Screen>
  );
}

function CompanyDetailScreen({
  company,
  posts,
  onBack,
  onOpenPost,
  onCreatePost,
  isLocked,
}) {
  const [category, setCategory] = React.useState(CATEGORIES[0].key);
  const [sort, setSort] = React.useState("newest");

  const data = React.useMemo(
    () => listPostsForCompany({ posts, companyId: company.id, category, sort }),
    [posts, company.id, category, sort],
  );

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader title={company.name} onBack={onBack} />

        <View style={{ paddingHorizontal: tokens.spacing[16], paddingBottom: tokens.spacing[16] }}>
          <ButtonPrimary
            label={isLocked?.(category) ? "Locked (Admin)" : "Drop Tea ☕"}
            disabled={Boolean(isLocked?.(category))}
            onPress={() => onCreatePost(category)}
          />
          {isLocked?.(category) ? (
            <Alert variant="warning" style={{ marginTop: tokens.spacing[12] }}>
              <Caption>Posting is locked for this company/category (admin action).</Caption>
            </Alert>
          ) : (
            <Caption style={{ marginTop: tokens.spacing[12], textAlign: "center" }}>
              Post anonymously. Do not include identifying info.
            </Caption>
          )}

          <Divider />

          <Caption style={{ marginBottom: tokens.spacing[8] }}>Category</Caption>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.key}
                label={c.label}
                selected={c.key === category}
                onPress={() => setCategory(c.key)}
              />
            ))}
          </ScrollView>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: tokens.spacing[16] }}>
            <Caption style={{ marginRight: tokens.spacing[12] }}>Sort</Caption>
            <Chip label="Newest" selected={sort === "newest"} onPress={() => setSort("newest")} />
            <Chip label="Top" selected={sort === "top"} onPress={() => setSort("top")} />
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <EmptyState
              title="No threads yet"
              message={`Be the first to share in ${getCategoryLabel(category)} (safely and anonymously).`}
            />
          }
          contentContainerStyle={{ paddingHorizontal: tokens.spacing[16], paddingBottom: 90 }}
          renderItem={({ item }) => (
            <Card 
              onPress={() => onOpenPost(item.id)}
              style={{ marginBottom: tokens.spacing[12] }}
            >
              <H2>{item.title}</H2>
              <Body style={{ marginTop: tokens.spacing[8] }} numberOfLines={2}>
                {item.body}
              </Body>
              <Caption style={{ marginTop: tokens.spacing[12] }}>
                {item.authorLabel ?? "Anonymous"} • {item.createdDate}
              </Caption>
            </Card>
          )}
        />
      </SafeAreaView>
    </Screen>
  );
}

function PostDetailScreen({ postId, onBack, companyName, posts, onReport }) {
  const post = getPostById(posts, postId);
  const [showReport, setShowReport] = React.useState(false);
  const [reportReason, setReportReason] = React.useState("doxxing_or_identity");

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader title={companyName} onBack={onBack} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: tokens.spacing[16], paddingBottom: tokens.spacing[24] }}>
          {post ? (
            <>
              <H1 style={{ marginBottom: tokens.spacing[12] }}>{post.title}</H1>
              <Caption style={{ marginBottom: tokens.spacing[16] }}>
                {getCategoryLabel(post.category)} • {post.authorLabel ?? "Anonymous"} •{" "}
                {post.createdDate}
              </Caption>
              
              <Card>
                <Body>{post.body}</Body>
              </Card>

              <Alert variant="info" style={{ marginTop: tokens.spacing[16] }}>
                <Caption>
                  Reporting is available. Voting is not implemented in Phase 1 MVP.
                </Caption>
              </Alert>

              <View style={{ marginTop: tokens.spacing[24] }}>
                {!showReport ? (
                  <ButtonSecondary
                    label="Report this post"
                    onPress={() => setShowReport(true)}
                  />
                ) : (
                  <ButtonGhost
                    label="Cancel"
                    onPress={() => setShowReport(false)}
                  />
                )}
              </View>

              {showReport ? (
                <View style={{ marginTop: tokens.spacing[16] }}>
                  <Caption style={{ marginBottom: tokens.spacing[8] }}>
                    Reason
                  </Caption>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {[
                      { key: "doxxing_or_identity", label: "Doxxing / Identity" },
                      { key: "hate_or_harassment", label: "Hate / Harassment" },
                      { key: "illegal_or_harm", label: "Illegal / Harm" },
                      { key: "other", label: "Other" },
                    ].map((r) => (
                      <Chip
                        key={r.key}
                        label={r.label}
                        selected={r.key === reportReason}
                        onPress={() => setReportReason(r.key)}
                        variant={r.key === reportReason ? "danger" : "default"}
                      />
                    ))}
                  </ScrollView>
                  <ButtonPrimary
                    label="Submit Report"
                    onPress={() => {
                      onReport?.(post.id, reportReason);
                      setShowReport(false);
                    }}
                    style={{ marginTop: tokens.spacing[16] }}
                  />
                  <Caption style={{ marginTop: tokens.spacing[12], textAlign: "center" }}>
                    Reports are queued for admin review (MVP). No public identity is attached.
                  </Caption>
                </View>
              ) : null}
            </>
          ) : (
            <EmptyState
              title="Thread not found"
              message="This post may have been removed or doesn't exist."
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

function CreatePostScreen({
  company,
  initialCategory,
  onBack,
  onCreatedVisible,
  authorKey,
  isLocked,
  isBanned,
  addPost,
}) {
  const [category, setCategory] = React.useState(initialCategory ?? CATEGORIES[0].key);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [error, setError] = React.useState(null);
  const [blockedReasons, setBlockedReasons] = React.useState(null);

  function submitDraft() {
    // Draft → allow/hold/block decision (minimal placeholder moderation hook).
    setError(null);
    setBlockedReasons(null);

    const trimmedBody = body.trim();
    if (!trimmedBody) {
      setError("Post body is required.");
      return;
    }

    if (isBanned) {
      setBlockedReasons(["This device is blocked from posting (admin ban)."]);
      return;
    }

    if (isLocked?.(category)) {
      setBlockedReasons(["Posting is locked for this company/category (admin lock)."]);
      return;
    }

    const trimmedTitle = title.trim();
    const finalTitle =
      trimmedTitle || trimmedBody.slice(0, 60) + (trimmedBody.length > 60 ? "…" : "");

    const mod = moderatePost({ title: finalTitle, body: trimmedBody });
    if (mod.decision === "block") {
      setBlockedReasons(mod.reasons);
      return;
    }

    const newPost = {
      id: `p_${Math.random().toString(16).slice(2, 10)}`,
      companyId: company.id,
      category,
      title: finalTitle,
      body: trimmedBody,
      authorLabel: randomAnonLabel(),
      authorKey: authorKey ?? "unknown",
      status: mod.decision === "hold" ? "held" : "visible",
      moderationReasons: mod.reasons ?? [],
      createdDate: todayIsoDate(),
      score: 0,
    };

    addPost(newPost);

    if (mod.decision === "hold") {
      setError("Under review (MVP): your post is held for admin review.");
      return;
    }

    onCreatedVisible(newPost.id);
  }

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader title={`Drop Tea — ${company.name}`} onBack={onBack} />
        <ScrollView contentContainerStyle={{ 
          paddingHorizontal: tokens.spacing[16], 
          paddingBottom: 90 
        }}>
          <Alert variant="info" style={{ marginBottom: tokens.spacing[16] }}>
            <BodyStrong style={{ marginBottom: tokens.spacing[8] }}>Stay anonymous</BodyStrong>
            <Caption>
              Don't include names, emails, phone numbers, addresses, or anything that can identify someone.
            </Caption>
            {isBanned ? (
              <Alert variant="danger" style={{ marginTop: tokens.spacing[12] }}>
                <Caption>Posting is blocked on this device (admin ban).</Caption>
              </Alert>
            ) : null}
          </Alert>

          <Caption style={{ marginBottom: tokens.spacing[8] }}>Category</Caption>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.key}
                label={c.label}
                selected={c.key === category}
                onPress={() => setCategory(c.key)}
              />
            ))}
          </ScrollView>

          <Caption style={{ marginTop: tokens.spacing[16], marginBottom: tokens.spacing[8] }}>
            Title (optional)
          </Caption>
          <UITextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Short summary"
            autoCapitalize="sentences"
          />

          <Caption style={{ marginTop: tokens.spacing[16], marginBottom: tokens.spacing[8] }}>
            Body
          </Caption>
          <UITextInput
            value={body}
            onChangeText={setBody}
            placeholder="Write your post (text only)"
            multiline
            numberOfLines={8}
            style={{ minHeight: 160, textAlignVertical: "top" }}
          />

          {error ? (
            <Alert variant="warning" style={{ marginTop: tokens.spacing[16] }}>
              <Caption>{error}</Caption>
            </Alert>
          ) : null}

          {blockedReasons ? (
            <Alert variant="danger" style={{ marginTop: tokens.spacing[16] }}>
              <BodyStrong style={{ marginBottom: tokens.spacing[8] }}>
                Blocked (safety check)
              </BodyStrong>
              {blockedReasons.map((r, idx) => (
                <Caption key={`${idx}-${r}`} style={{ marginTop: tokens.spacing[4] }}>
                  • {r}
                </Caption>
              ))}
            </Alert>
          ) : null}

          <View style={{ marginTop: tokens.spacing[24] }}>
            <ButtonPrimary label="Post ☕" onPress={submitDraft} disabled={Boolean(isBanned)} />
            <Caption style={{ marginTop: tokens.spacing[12], textAlign: "center" }}>
              Posts can be visible, held for review, or blocked.
            </Caption>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

function TabBar({ tab, onTab }) {
  const Item = ({ id, label, emoji }) => {
    const isSelected = tab === id;
    return (
      <Pressable
        onPress={() => onTab(id)}
        accessibilityRole="button"
        style={{
          flex: 1,
          paddingVertical: tokens.spacing[12],
          borderRadius: tokens.radius.md,
          backgroundColor: isSelected ? tokens.color.primary600 : "transparent",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: isSelected ? "#FFFFFF" : tokens.color.textSecondary,
            ...tokens.typography.bodyStrong,
          }}
        >
          {emoji} {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        position: "absolute",
        left: tokens.spacing[16],
        right: tokens.spacing[16],
        bottom: tokens.spacing[16],
        backgroundColor: tokens.color.card,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: tokens.color.border,
        padding: tokens.spacing[8],
        flexDirection: "row",
        gap: tokens.spacing[8],
        ...tokens.elevation.medium,
      }}
    >
      <Item id="tea" label="Tea" emoji="☕" />
      <Item id="future" label="Future" emoji="🔮" />
      <Item id="me" label="Me" emoji="👤" />
    </View>
  );
}

export default function App() {
  const [allPosts, setAllPosts] = React.useState(() => initialPosts);
  const [screen, setScreen] = React.useState({ name: "company_list" });
  const [tab, setTab] = React.useState("tea"); // tea | future | me
  const [profile, setProfile] = React.useState(() => defaultProfile());
  const [profileLoaded, setProfileLoaded] = React.useState(false);
  const [clientKey, setClientKey] = React.useState(null);
  const [reports, setReports] = React.useState([]);
  const [lockedKeys, setLockedKeys] = React.useState(() => new Set()); // `${companyId}::${category}`
  const [bannedAuthorKeys, setBannedAuthorKeys] = React.useState(() => new Set());

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const p = await loadProfile();
      if (!cancelled) {
        setProfile(p);
        setProfileLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const key = await getOrCreateClientKey();
      if (!cancelled) setClientKey(key);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Tab roots (Gen Z-friendly bottom nav)
  if (screen.name === "company_list") {
    return (
      <Screen>
        <SafeAreaView style={{ flex: 1 }}>
          {tab === "tea" ? (
            <CompanyListScreen
              onSelect={(company) => setScreen({ name: "company_detail", company })}
            />
          ) : tab === "future" ? (
            <FutureJobsScreen
              profile={profile}
              profileLoaded={profileLoaded}
              onEditProfile={() => {
                setTab("me");
                setScreen({ name: "profile" });
              }}
              onBack={() => {}}
            />
          ) : (
            <ProfileScreen
              profile={profile}
              profileLoaded={profileLoaded}
              onBack={() => {}}
              onSave={async (next) => {
                setProfile(next);
                await saveProfile(next);
              }}
              onReset={async () => {
                const next = defaultProfile();
                setProfile(next);
                await clearProfile();
              }}
              onOpenAdmin={() => setScreen({ name: "admin_review" })}
            />
          )}
        </SafeAreaView>
        <TabBar tab={tab} onTab={setTab} />
      </Screen>
    );
  }

  if (screen.name === "company_detail") {
    return (
      <CompanyDetailScreen
        company={screen.company}
        posts={allPosts}
        onBack={() => setScreen({ name: "company_list" })}
        onOpenPost={(postId) => setScreen({ name: "post_detail", postId })}
        isLocked={(category) => lockedKeys.has(`${screen.company.id}::${category}`)}
        onCreatePost={(initialCategory) =>
          setScreen({ name: "create_post", company: screen.company, initialCategory })
        }
      />
    );
  }

  if (screen.name === "create_post") {
    return (
      <CreatePostScreen
        company={screen.company}
        initialCategory={screen.initialCategory}
        onBack={() => setScreen({ name: "company_detail", company: screen.company })}
        authorKey={clientKey}
        isLocked={(category) => lockedKeys.has(`${screen.company.id}::${category}`)}
        isBanned={Boolean(clientKey && bannedAuthorKeys.has(clientKey))}
        addPost={(p) => setAllPosts((prev) => [p, ...prev])}
        onCreatedVisible={(postId) => setScreen({ name: "post_detail", postId })}
      />
    );
  }

  if (screen.name === "future_jobs") {
    return (
      <FutureJobsScreen
        profile={profile}
        profileLoaded={profileLoaded}
        onEditProfile={() => setScreen({ name: "profile" })}
        onBack={() => setScreen({ name: "company_list" })}
      />
    );
  }

  if (screen.name === "profile") {
    return (
      <ProfileScreen
        profile={profile}
        profileLoaded={profileLoaded}
        onBack={() => setScreen({ name: "company_list" })}
        onSave={async (next) => {
          setProfile(next);
          await saveProfile(next);
        }}
        onReset={async () => {
          const next = defaultProfile();
          setProfile(next);
          await clearProfile();
        }}
      />
    );
  }

  if (screen.name === "admin_review") {
    return (
      <AdminReviewScreen
        onBack={() => setScreen({ name: "company_list" })}
        posts={allPosts}
        reports={reports}
        onApprovePost={(postId, reason) => {
          setAllPosts((prev) =>
            prev.map((p) =>
              p.id === postId ? { ...p, status: "visible", adminReason: reason } : p,
            ),
          );
        }}
        onRemovePost={(postId, reason) => {
          setAllPosts((prev) =>
            prev.map((p) =>
              p.id === postId ? { ...p, status: "removed", adminReason: reason } : p,
            ),
          );
        }}
        onLock={(companyId, category, reason) => {
          setLockedKeys((prev) => new Set([...prev, `${companyId}::${category}`]));
          setAllPosts((prev) =>
            prev.map((p) =>
              p.companyId === companyId && p.category === category
                ? { ...p, lockReason: reason }
                : p,
            ),
          );
        }}
        onBanAuthorKey={(authorKey, reason) => {
          if (!authorKey) return;
          setBannedAuthorKeys((prev) => new Set([...prev, authorKey]));
          setAllPosts((prev) =>
            prev.map((p) =>
              p.authorKey === authorKey ? { ...p, banReason: reason } : p,
            ),
          );
        }}
        onResolveReport={(reportId) => {
          setReports((prev) =>
            prev.map((r) => (r.id === reportId ? { ...r, status: "resolved" } : r)),
          );
        }}
      />
    );
  }

  // post_detail
  const post = getPostById(allPosts, screen.postId);
  const companyName =
    companies.find((c) => c.id === post?.companyId)?.name ?? "Company";

  return (
    <PostDetailScreen
      postId={screen.postId}
      posts={allPosts}
      companyName={companyName}
      onReport={(postId, reason) => {
        const report = {
          id: `r_${Math.random().toString(16).slice(2, 10)}`,
          postId,
          reason,
          createdDate: todayIsoDate(),
          status: "open",
        };
        setReports((prev) => [report, ...prev]);
      }}
      onBack={() =>
        post
          ? setScreen({
              name: "company_detail",
              company: companies.find((c) => c.id === post.companyId),
            })
          : setScreen({ name: "company_list" })
      }
    />
  );
}

function parseSkills(skillsText) {
  return skillsText
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function FutureJobsScreen({ onBack, onEditProfile, profile, profileLoaded }) {
  const country = profile?.country ?? "global";
  const industry = profile?.industry ?? "general";
  const roleOrStudy = profile?.roleOrStudy ?? "";
  const experienceLevel = profile?.experienceLevel ?? "student";
  const skills = parseSkills(profile?.skillsText ?? "");

  const insights = React.useMemo(
    () => generateBasicInsights({ country, industry, roleOrStudy, experienceLevel, skills }),
    [country, industry, roleOrStudy, experienceLevel, profile?.skillsText],
  );

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader title="Future Jobs 🔮" onBack={onBack} />
        <ScrollView contentContainerStyle={{ 
          paddingHorizontal: tokens.spacing[16], 
          paddingBottom: 90 
        }}>
          <View style={{ flexDirection: "row", gap: tokens.spacing[12], marginBottom: tokens.spacing[16] }}>
            <View style={{ flex: 1 }}>
              <ButtonPrimary
                label={profileLoaded ? "Edit Profile" : "Loading…"}
                onPress={onEditProfile}
              />
            </View>
            <View style={{ width: 120 }}>
              <ButtonGhost label="Refresh" onPress={() => {}} />
            </View>
          </View>

          <Alert variant="info" style={{ marginBottom: tokens.spacing[16] }}>
            <BodyStrong style={{ marginBottom: tokens.spacing[8] }}>
              Plain-language, not a promise
            </BodyStrong>
            <Caption>
              This is a simplified, rules-based view using a small curated dataset inspired by
              WEF Future of Jobs themes. It is not a guarantee or prediction.
            </Caption>
          </Alert>

        <Card style={{ marginBottom: tokens.spacing[16] }}>
          <Caption>
            Country: <BodyStrong>{country}</BodyStrong>{" "}
            • Industry: <BodyStrong>{industry}</BodyStrong>
          </Caption>
          <Micro style={{ marginTop: tokens.spacing[8] }}>
            These come from your optional profile. If country is "global", output is a global fallback.
          </Micro>
        </Card>

        <Card>
          <Caption style={{ marginBottom: tokens.spacing[8] }}>Summary</Caption>
          <Body>{insights.summary_plain_language}</Body>
        </Card>

        <InsightsSection title="Jobs at risk (high-level)" items={insights.jobs_at_risk} />
        <InsightsSection title="Emerging roles (high-level)" items={insights.emerging_roles} />
        <InsightsSection title="Fast-growing skills" items={insights.fast_growing_skills} />
        <InsightsSection title="Declining skills" items={insights.declining_skills} />
        <InsightsSection
          title="What this means for you"
          items={insights.what_this_means_for_you}
        />

        <Card style={{ marginTop: tokens.spacing[16] }}>
          <Caption style={{ marginBottom: tokens.spacing[8] }}>Rationale</Caption>
          <Caption>{insights.rationale}</Caption>
        </Card>

        <Caption style={{ marginTop: tokens.spacing[16], textAlign: "center" }}>
          No scenario modeling. No predictions. Just guidance you can act on.
        </Caption>
      </ScrollView>
    </SafeAreaView>
    </Screen>
  );
}

function InsightsSection({ title, items }) {
  return (
    <Card style={{ marginTop: tokens.spacing[16] }}>
      <Caption style={{ marginBottom: tokens.spacing[12] }}>{title}</Caption>
      <View>
        {items.map((item, idx) => (
          <Body key={item} style={{ marginTop: idx > 0 ? tokens.spacing[8] : 0 }}>
            • {item}
          </Body>
        ))}
      </View>
    </Card>
  );
}

function ProfileScreen({
  onBack,
  profile,
  profileLoaded,
  onSave,
  onReset,
  onOpenAdmin,
}) {
  const [draft, setDraft] = React.useState(() => profile ?? defaultProfile());
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    if (profileLoaded) setDraft(profile);
  }, [profileLoaded, profile]);

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader title="Me 👤" onBack={onBack} />
        <ScrollView contentContainerStyle={{ 
          paddingHorizontal: tokens.spacing[16], 
          paddingBottom: 90 
        }}>
          <Alert variant="info" style={{ marginBottom: tokens.spacing[16] }}>
            <BodyStrong style={{ marginBottom: tokens.spacing[8] }}>Optional profile</BodyStrong>
            <Caption>
              Stored locally on your device. Don't enter names, emails, or phone numbers.
            </Caption>
          </Alert>

        <Caption style={{ marginTop: tokens.spacing[16], marginBottom: tokens.spacing[8] }}>
          Country / Region (required to claim personalization)
        </Caption>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {COUNTRIES.map((c) => (
            <Chip
              key={c.key}
              label={c.label}
              selected={c.key === draft.country}
              onPress={() => setDraft((p) => ({ ...p, country: c.key }))}
            />
          ))}
        </ScrollView>

        <Caption style={{ marginTop: tokens.spacing[16], marginBottom: tokens.spacing[8] }}>
          Industry
        </Caption>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {INDUSTRIES.map((i) => (
            <Chip
              key={i.key}
              label={i.label}
              selected={i.key === draft.industry}
              onPress={() => setDraft((p) => ({ ...p, industry: i.key }))}
            />
          ))}
        </ScrollView>

        <Caption style={{ marginTop: tokens.spacing[16], marginBottom: tokens.spacing[8] }}>
          Current role or study field (optional)
        </Caption>
        <UITextInput
          value={draft.roleOrStudy}
          onChangeText={(t) => setDraft((p) => ({ ...p, roleOrStudy: t }))}
          placeholder="e.g., Computer Science student, Junior analyst"
          autoCapitalize="sentences"
        />

        <Caption style={{ marginTop: tokens.spacing[16], marginBottom: tokens.spacing[8] }}>
          Experience level (optional)
        </Caption>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: "student", label: "Student" },
            { key: "junior", label: "Junior" },
            { key: "mid", label: "Mid-level" },
          ].map((x) => (
            <Chip
              key={x.key}
              label={x.label}
              selected={x.key === draft.experienceLevel}
              onPress={() => setDraft((p) => ({ ...p, experienceLevel: x.key }))}
            />
          ))}
        </ScrollView>

        <Caption style={{ marginTop: tokens.spacing[16], marginBottom: tokens.spacing[8] }}>
          Skills (optional, comma-separated)
        </Caption>
        <UITextInput
          value={draft.skillsText}
          onChangeText={(t) => setDraft((p) => ({ ...p, skillsText: t }))}
          placeholder="e.g., Excel, SQL, communication"
          autoCapitalize="none"
        />

          {status ? (
            <Alert variant="success" style={{ marginTop: tokens.spacing[16] }}>
              <Caption>{status}</Caption>
            </Alert>
          ) : null}

          <View style={{ 
            flexDirection: "row", 
            gap: tokens.spacing[12], 
            marginTop: tokens.spacing[24] 
          }}>
            <View style={{ flex: 1 }}>
              <ButtonPrimary
                label={profileLoaded ? "Save" : "Loading…"}
                onPress={async () => {
                  setStatus(null);
                  await onSave(draft);
                  setStatus("Saved locally.");
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <ButtonSecondary
                label="Reset"
                onPress={async () => {
                  setStatus(null);
                  await onReset();
                  setDraft(defaultProfile());
                  setStatus("Reset to defaults.");
                }}
              />
            </View>
          </View>

          <Divider />

          <ButtonGhost label="Admin Review (MVP)" onPress={onOpenAdmin} />
          <Caption style={{ marginTop: tokens.spacing[12], textAlign: "center" }}>
            For testing moderation flows only. Not an end-user feature.
          </Caption>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

function AdminReviewScreen({
  onBack,
  posts,
  reports,
  onApprovePost,
  onRemovePost,
  onLock,
  onBanAuthorKey,
  onResolveReport,
}) {
  const [tab, setTab] = React.useState("held"); // held | reports
  const [reason, setReason] = React.useState("policy_violation");

  const heldPosts = React.useMemo(
    () => posts.filter((p) => (p.status ?? "visible") === "held"),
    [posts],
  );

  const openReports = React.useMemo(
    () => reports.filter((r) => (r.status ?? "open") === "open"),
    [reports],
  );

  return (
    <Screen>
      <SafeAreaView style={{ flex: 1 }}>
        <BackHeader title="Admin Review (MVP) 🛡️" onBack={onBack} />
        <View style={{ 
          paddingHorizontal: tokens.spacing[16], 
          paddingBottom: tokens.spacing[16] 
        }}>
          <Alert variant="warning" style={{ marginBottom: tokens.spacing[16] }}>
            <Caption>
              MVP admin tools for Phase 1: approve/remove held posts, resolve reports, and apply
              basic lock/ban actions. No analytics dashboard.
            </Caption>
          </Alert>

          <View style={{ flexDirection: "row", marginBottom: tokens.spacing[16] }}>
            <Chip label="Held" selected={tab === "held"} onPress={() => setTab("held")} />
            <Chip
              label="Reports"
              selected={tab === "reports"}
              onPress={() => setTab("reports")}
            />
          </View>

          <Caption style={{ marginBottom: tokens.spacing[8] }}>
            Reason code (internal)
          </Caption>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[
              { key: "policy_violation", label: "Policy violation" },
              { key: "doxxing", label: "Doxxing" },
              { key: "hate", label: "Hate/harassment" },
              { key: "illegal", label: "Illegal content" },
              { key: "spam", label: "Spam" },
              { key: "ok", label: "No issue" },
            ].map((r) => (
              <Chip
                key={r.key}
                label={r.label}
                selected={r.key === reason}
                onPress={() => setReason(r.key)}
              />
            ))}
          </ScrollView>
        </View>

        {tab === "held" ? (
          <FlatList
            data={heldPosts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ 
              paddingHorizontal: tokens.spacing[16], 
              paddingBottom: tokens.spacing[24] 
            }}
            ListEmptyComponent={
              <EmptyState
                title="No held posts"
                message="All posts are either visible or removed."
              />
            }
            renderItem={({ item }) => (
              <Card style={{ marginBottom: tokens.spacing[16] }}>
                <H2>{item.title}</H2>
                <Body style={{ marginTop: tokens.spacing[8] }} numberOfLines={3}>
                  {item.body}
                </Body>
                {item.moderationReasons?.length ? (
                  <Alert variant="warning" style={{ marginTop: tokens.spacing[12] }}>
                    <Micro>Hold reasons: {item.moderationReasons.join(" | ")}</Micro>
                  </Alert>
                ) : null}

                <View style={{ flexDirection: "row", gap: tokens.spacing[12], marginTop: tokens.spacing[16] }}>
                  <View style={{ flex: 1 }}>
                    <ButtonPrimary
                      label="Approve"
                      onPress={() => onApprovePost(item.id, reason)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ButtonDanger
                      label="Remove"
                      onPress={() => onRemovePost(item.id, reason)}
                    />
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: tokens.spacing[12], marginTop: tokens.spacing[12] }}>
                  <View style={{ flex: 1 }}>
                    <ButtonGhost
                      label="Lock category"
                      onPress={() => onLock(item.companyId, item.category, reason)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ButtonGhost
                      label="Ban author"
                      onPress={() => onBanAuthorKey(item.authorKey, reason)}
                    />
                  </View>
                </View>
              </Card>
            )}
          />
        ) : (
          <FlatList
            data={openReports}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ 
              paddingHorizontal: tokens.spacing[16], 
              paddingBottom: tokens.spacing[24] 
            }}
            ListEmptyComponent={
              <EmptyState
                title="No open reports"
                message="All reports have been resolved."
              />
            }
            renderItem={({ item }) => {
              const post = posts.find((p) => p.id === item.postId);
              return (
                <Card style={{ marginBottom: tokens.spacing[16] }}>
                  <BodyStrong>Report: {item.reason}</BodyStrong>
                  <Caption style={{ marginTop: tokens.spacing[4] }}>
                    {item.createdDate}
                  </Caption>
                  {post ? (
                    <>
                      <H2 style={{ marginTop: tokens.spacing[12] }}>{post.title}</H2>
                      <Body style={{ marginTop: tokens.spacing[8] }} numberOfLines={3}>
                        {post.body}
                      </Body>
                    </>
                  ) : (
                    <Caption style={{ marginTop: tokens.spacing[12] }}>
                      Post not found (may have been removed).
                    </Caption>
                  )}

                  <View style={{ flexDirection: "row", gap: tokens.spacing[12], marginTop: tokens.spacing[16] }}>
                    <View style={{ flex: 1 }}>
                      <ButtonSecondary
                        label="Resolve"
                        onPress={() => onResolveReport(item.id)}
                      />
                    </View>
                    {post ? (
                      <View style={{ flex: 1 }}>
                        <ButtonDanger
                          label="Remove post"
                          onPress={() => onRemovePost(post.id, reason)}
                        />
                      </View>
                    ) : null}
                  </View>
                </Card>
              );
            }}
          />
        )}
      </SafeAreaView>
    </Screen>
  );
}


