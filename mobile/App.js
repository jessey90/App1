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
  ButtonGhost,
  ButtonPrimary,
  Card,
  Divider,
  H1,
  H2,
  P,
  Pill,
  Screen,
  Small,
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
    <Text style={{ color: theme.colors.text, ...theme.type.h2, marginBottom: 12 }}>
      {children}
    </Text>
  );
}

function Chip({ label, selected, onPress }) {
  return <Pill label={label} selected={selected} onPress={onPress} />;
}

function BackHeader({ title, onBack }) {
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 12,
        backgroundColor: theme.colors.bg,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            style={{
              paddingVertical: 8,
              paddingRight: 16,
              paddingLeft: 6,
              marginLeft: -6,
            }}
          >
            <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "800" }}>
              Back
            </Text>
          </Pressable>
        ) : null}
        <Text style={{ color: theme.colors.text, ...theme.type.h2 }}>{title}</Text>
      </View>
      <Small style={{ marginTop: 8 }}>
        Anonymous by default. No usernames. No accounts.
      </Small>
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
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 }}>
          <H1>Anonymous Gossip Corporate</H1>
          <P style={{ marginTop: 8 }}>
            Anonymous, community-led insights.
          </P>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search a company"
            placeholderTextColor={theme.colors.subtle}
            autoCapitalize="none"
            style={{
              marginTop: 14,
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 14,
              paddingHorizontal: 12,
              paddingVertical: 12,
              backgroundColor: theme.colors.bg,
              color: theme.colors.text,
            }}
          />
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSelect(item)}
              accessibilityRole="button"
              style={{ marginBottom: 10 }}
            >
              <Card>
                <H2>{item.name}</H2>
                <Small style={{ marginTop: 6 }}>
                  Tap to browse categories and threads
                </Small>
              </Card>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
              <Small>No companies match that search.</Small>
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

        <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
          <ButtonPrimary
            label={isLocked?.(category) ? "Locked (Admin)" : "Drop Tea"}
            disabled={Boolean(isLocked?.(category))}
            onPress={() => onCreatePost(category)}
          />
          {isLocked?.(category) ? (
            <Small style={{ marginTop: 10 }}>
              Posting is locked for this company/category (admin action).
            </Small>
          ) : (
            <Small style={{ marginTop: 10 }}>
              Post anonymously. Do not include identifying info.
            </Small>
          )}

          <Divider />

          <Small style={{ marginBottom: 8 }}>Category</Small>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((c) => (
              <Pill
                key={c.key}
                label={c.label}
                selected={c.key === category}
                onPress={() => setCategory(c.key)}
                tone="accent"
              />
            ))}
          </ScrollView>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
            <Small style={{ marginRight: 10 }}>Sort</Small>
            <Pill label="Newest" selected={sort === "newest"} onPress={() => setSort("newest")} />
            <Pill label="Top" selected={sort === "top"} onPress={() => setSort("top")} />
          </View>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
              <Small>
                No threads yet in {getCategoryLabel(category)}. Be the first (safely).
              </Small>
            </View>
          }
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => onOpenPost(item.id)} accessibilityRole="button">
              <View style={{ marginBottom: 10 }}>
                <Card>
                  <H2>{item.title}</H2>
                  <P style={{ marginTop: 8 }} numberOfLines={2}>
                    {item.body}
                  </P>
                  <Small style={{ marginTop: 10 }}>
                    {item.authorLabel ?? "Anonymous"} • {item.createdDate}
                  </Small>
                </Card>
              </View>
            </Pressable>
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
    <SafeAreaView style={{ flex: 1 }}>
      <BackHeader title={companyName} onBack={onBack} />
      <View style={{ paddingHorizontal: 16, paddingTop: 4 }}>
        {post ? (
          <>
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{post.title}</Text>
            <Text style={{ marginTop: 10, color: "#444", fontSize: 13 }}>
              {getCategoryLabel(post.category)} • {post.authorLabel ?? "Anonymous"} •{" "}
              {post.createdDate}
            </Text>
            <View style={{ marginTop: 14 }}>
              <Text style={{ fontSize: 15, lineHeight: 22 }}>{post.body}</Text>
            </View>
            <View style={{ marginTop: 18 }}>
              <Text style={{ color: "#666", fontSize: 13 }}>
                Reporting is available in Milestone 6. Voting is not implemented.
              </Text>
            </View>

            <View style={{ marginTop: 18 }}>
              <Pressable
                onPress={() => setShowReport((v) => !v)}
                accessibilityRole="button"
                style={{
                  alignSelf: "flex-start",
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#111",
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontWeight: "800" }}>
                  {showReport ? "Cancel" : "Report"}
                </Text>
              </Pressable>
            </View>

            {showReport ? (
              <View style={{ marginTop: 12 }}>
                <Text style={{ color: "#444", fontSize: 13, marginBottom: 8 }}>
                  Reason
                </Text>
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
                    />
                  ))}
                </ScrollView>
                <Pressable
                  onPress={() => {
                    onReport?.(post.id, reportReason);
                    setShowReport(false);
                  }}
                  accessibilityRole="button"
                  style={{
                    marginTop: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    borderRadius: 12,
                    backgroundColor: "#111",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800" }}>
                    Submit Report
                  </Text>
                </Pressable>
                <Text
                  style={{ marginTop: 10, color: "#666", fontSize: 12, lineHeight: 16 }}
                >
                  Reports are queued for admin review (MVP). No public identity is attached.
                </Text>
              </View>
            ) : null}
          </>
        ) : (
          <Text style={{ color: "#444" }}>Thread not found.</Text>
        )}
      </View>
    </SafeAreaView>
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
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}>
          <Card>
            <H2>Stay anonymous</H2>
            <Small style={{ marginTop: 8 }}>
              Don’t include names, emails, phone numbers, addresses, or anything that can identify
              someone.
            </Small>
            {isBanned ? (
              <Small style={{ marginTop: 10, color: theme.colors.warning }}>
                Posting is blocked on this device (admin ban).
              </Small>
            ) : null}
          </Card>

          <Small style={{ marginTop: 16, marginBottom: 8 }}>Category</Small>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CATEGORIES.map((c) => (
              <Pill
                key={c.key}
                label={c.label}
                selected={c.key === category}
                onPress={() => setCategory(c.key)}
                tone="accent"
              />
            ))}
          </ScrollView>

          <Small style={{ marginTop: 16, marginBottom: 8 }}>Title (optional)</Small>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Short summary"
            placeholderTextColor={theme.colors.subtle}
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 14,
              paddingHorizontal: 12,
              paddingVertical: 12,
              backgroundColor: theme.colors.bg,
              color: theme.colors.text,
            }}
          />

          <Small style={{ marginTop: 16, marginBottom: 8 }}>Body</Small>
          <TextInput
            value={body}
            onChangeText={setBody}
            placeholder="Write your post (text only)"
            placeholderTextColor={theme.colors.subtle}
            multiline
            style={{
              borderWidth: 1,
              borderColor: theme.colors.border,
              borderRadius: 14,
              paddingHorizontal: 12,
              paddingVertical: 12,
              minHeight: 160,
              backgroundColor: theme.colors.bg,
              color: theme.colors.text,
              textAlignVertical: "top",
            }}
          />

          {error ? (
            <Small style={{ marginTop: 10, color: theme.colors.warning }}>{error}</Small>
          ) : null}

          {blockedReasons ? (
            <Card style={{ marginTop: 12, borderColor: theme.colors.border }}>
              <Text style={{ color: theme.colors.text, fontWeight: "900" }}>
                Blocked (safety check)
              </Text>
              {blockedReasons.map((r, idx) => (
                <Small key={`${idx}-${r}`} style={{ marginTop: 6, color: theme.colors.text }}>
                  - {r}
                </Small>
              ))}
            </Card>
          ) : null}

          <View style={{ marginTop: 16 }}>
            <ButtonPrimary label="Post" onPress={submitDraft} disabled={Boolean(isBanned)} />
            <Small style={{ marginTop: 10 }}>
              Posts can be visible, held for review, or blocked.
            </Small>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Screen>
  );
}

function TabBar({ tab, onTab }) {
  const Item = ({ id, label }) => (
    <Pressable
      onPress={() => onTab(id)}
      accessibilityRole="button"
      style={{
        flex: 1,
        paddingVertical: 10,
        borderRadius: 14,
        backgroundColor: tab === id ? theme.colors.card : "transparent",
        borderWidth: 1,
        borderColor: tab === id ? theme.colors.border : "transparent",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: tab === id ? theme.colors.text : theme.colors.muted,
          fontWeight: "900",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );

  return (
    <View
      style={{
        position: "absolute",
        left: 16,
        right: 16,
        bottom: 14,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 8,
        flexDirection: "row",
        gap: 8,
      }}
    >
      <Item id="tea" label="Tea" />
      <Item id="future" label="Future" />
      <Item id="me" label="Me" />
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
        <BackHeader title="Future Jobs" onBack={onBack} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
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

          <Card>
            <H2>Plain-language, not a promise</H2>
            <Small style={{ marginTop: 8 }}>
              This is a simplified, rules-based view using a small curated dataset inspired by
              WEF Future of Jobs themes. It is not a guarantee or prediction.
            </Small>
          </Card>

        <View style={{ marginTop: 16 }}>
          <Small>
            Country: <Text style={{ color: theme.colors.text, fontWeight: "900" }}>{country}</Text>{" "}
            • Industry:{" "}
            <Text style={{ color: theme.colors.text, fontWeight: "900" }}>{industry}</Text>
          </Small>
          <Small style={{ marginTop: 6 }}>
            Milestone 5: these come from your optional profile. If country is “global”, output
            is a global fallback.
          </Small>
        </View>

        <Card style={{ marginTop: 14 }}>
          <Small>Summary</Small>
          <P style={{ marginTop: 10, color: theme.colors.text }}>
            {insights.summary_plain_language}
          </P>
        </Card>

        <InsightsSection title="Jobs at risk (high-level)" items={insights.jobs_at_risk} />
        <InsightsSection title="Emerging roles (high-level)" items={insights.emerging_roles} />
        <InsightsSection title="Fast-growing skills" items={insights.fast_growing_skills} />
        <InsightsSection title="Declining skills" items={insights.declining_skills} />

        <InsightsSection
          title="What this means for you"
          items={insights.what_this_means_for_you}
        />

        <Card style={{ marginTop: 16 }}>
          <Small>Rationale</Small>
          <Small style={{ marginTop: 8 }}>{insights.rationale}</Small>
        </Card>

        <Small style={{ marginTop: 14 }}>
          No scenario modeling. No predictions. Just guidance you can act on.
        </Small>
      </ScrollView>
    </SafeAreaView>
    </Screen>
  );
}

function InsightsSection({ title, items }) {
  return (
    <Card style={{ marginTop: 14 }}>
      <Small>{title}</Small>
      <View style={{ marginTop: 8 }}>
        {items.map((item) => (
          <Text key={item} style={{ color: theme.colors.text, lineHeight: 20, marginTop: 8 }}>
            • {item}
          </Text>
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
        <BackHeader title="Me" onBack={onBack} />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 90 }}>
          <Card>
            <H2>Optional profile</H2>
            <Small style={{ marginTop: 8 }}>
              Stored locally on your device. Don’t enter names, emails, or phone numbers.
            </Small>
          </Card>

        <Text style={{ fontSize: 13, color: "#444", marginTop: 16, marginBottom: 8 }}>
          Country / Region (required to claim personalization)
        </Text>
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

        <Text style={{ fontSize: 13, color: "#444", marginTop: 16, marginBottom: 8 }}>
          Industry
        </Text>
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

        <Text style={{ fontSize: 13, color: "#444", marginTop: 16, marginBottom: 8 }}>
          Current role or study field (optional)
        </Text>
        <TextInput
          value={draft.roleOrStudy}
          onChangeText={(t) => setDraft((p) => ({ ...p, roleOrStudy: t }))}
          placeholder="e.g., Computer Science student, Junior analyst"
          autoCapitalize="sentences"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: "#fff",
          }}
        />

        <Text style={{ fontSize: 13, color: "#444", marginTop: 16, marginBottom: 8 }}>
          Experience level (optional)
        </Text>
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

        <Text style={{ fontSize: 13, color: "#444", marginTop: 16, marginBottom: 8 }}>
          Skills (optional, comma-separated)
        </Text>
        <TextInput
          value={draft.skillsText}
          onChangeText={(t) => setDraft((p) => ({ ...p, skillsText: t }))}
          placeholder="e.g., Excel, SQL, communication"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
            backgroundColor: "#fff",
          }}
        />

          {status ? <Small style={{ marginTop: 12 }}>{status}</Small> : null}

          <View style={{ flexDirection: "row", gap: 10, marginTop: 16 }}>
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
              <ButtonGhost
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

          <View style={{ marginTop: 16 }}>
            <ButtonGhost label="Admin Review (MVP)" onPress={onOpenAdmin} />
            <Small style={{ marginTop: 8 }}>
              For testing moderation flows only. Not an end-user feature.
            </Small>
          </View>
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
    <SafeAreaView style={{ flex: 1 }}>
      <BackHeader title="Admin Review (MVP)" onBack={onBack} />
      <View style={{ paddingHorizontal: 16, paddingBottom: 12 }}>
        <Text style={{ color: "#666", fontSize: 12, lineHeight: 16 }}>
          MVP admin tools for Phase 1: approve/remove held posts, resolve reports, and apply
          basic lock/ban actions. No analytics dashboard.
        </Text>

        <View style={{ flexDirection: "row", marginTop: 12 }}>
          <Chip label="Held" selected={tab === "held"} onPress={() => setTab("held")} />
          <Chip
            label="Reports"
            selected={tab === "reports"}
            onPress={() => setTab("reports")}
          />
        </View>

        <Text style={{ fontSize: 13, color: "#444", marginTop: 12, marginBottom: 8 }}>
          Reason code (internal)
        </Text>
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
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={{ color: "#444", paddingTop: 8 }}>
              No held posts right now.
            </Text>
          }
          renderItem={({ item }) => (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#eee",
                borderRadius: 12,
                padding: 12,
                marginBottom: 10,
                backgroundColor: "#fff",
              }}
            >
              <Text style={{ fontWeight: "800" }}>{item.title}</Text>
              <Text style={{ marginTop: 6, color: "#444" }} numberOfLines={3}>
                {item.body}
              </Text>
              {item.moderationReasons?.length ? (
                <Text style={{ marginTop: 8, color: "#666", fontSize: 12 }}>
                  Hold reasons: {item.moderationReasons.join(" | ")}
                </Text>
              ) : null}

              <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
                <Pressable
                  onPress={() => onApprovePost(item.id, reason)}
                  accessibilityRole="button"
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    backgroundColor: "#111",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "800" }}>Approve</Text>
                </Pressable>
                <Pressable
                  onPress={() => onRemovePost(item.id, reason)}
                  accessibilityRole="button"
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#111",
                    backgroundColor: "#fff",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#111", fontWeight: "800" }}>Remove</Text>
                </Pressable>
              </View>

              <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
                <Pressable
                  onPress={() => onLock(item.companyId, item.category, reason)}
                  accessibilityRole="button"
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    backgroundColor: "#fff",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#111", fontWeight: "700" }}>Lock category</Text>
                </Pressable>
                <Pressable
                  onPress={() => onBanAuthorKey(item.authorKey, reason)}
                  accessibilityRole="button"
                  style={{
                    flex: 1,
                    paddingVertical: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    backgroundColor: "#fff",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#111", fontWeight: "700" }}>Ban author</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={openReports}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          ListEmptyComponent={
            <Text style={{ color: "#444", paddingTop: 8 }}>
              No open reports right now.
            </Text>
          }
          renderItem={({ item }) => {
            const post = posts.find((p) => p.id === item.postId);
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#eee",
                  borderRadius: 12,
                  padding: 12,
                  marginBottom: 10,
                  backgroundColor: "#fff",
                }}
              >
                <Text style={{ fontWeight: "800" }}>Report: {item.reason}</Text>
                <Text style={{ marginTop: 6, color: "#666", fontSize: 12 }}>
                  {item.createdDate}
                </Text>
                {post ? (
                  <>
                    <Text style={{ marginTop: 10, fontWeight: "700" }}>{post.title}</Text>
                    <Text style={{ marginTop: 6, color: "#444" }} numberOfLines={3}>
                      {post.body}
                    </Text>
                  </>
                ) : (
                  <Text style={{ marginTop: 10, color: "#444" }}>
                    Post not found (may have been removed).
                  </Text>
                )}

                <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
                  <Pressable
                    onPress={() => onResolveReport(item.id)}
                    accessibilityRole="button"
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#111",
                      backgroundColor: "#fff",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#111", fontWeight: "800" }}>Resolve</Text>
                  </Pressable>
                  {post ? (
                    <Pressable
                      onPress={() => onRemovePost(post.id, reason)}
                      accessibilityRole="button"
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        borderRadius: 10,
                        backgroundColor: "#111",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#fff", fontWeight: "800" }}>Remove post</Text>
                    </Pressable>
                  ) : null}
                </View>
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}


