import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  LogOut,
  User,
  Menu,
  X,
  Mail,
  Phone,
  Building2,
  Package,
  MapPin,
  TrendingUp,
  RefreshCw,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Trash2,
} from "lucide-react";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardLayout,
});

interface AdminUser {
  username: string;
  email: string;
  role: string;
}

function AdminDashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "quotes">("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin-session");
      if (!response.ok) {
        navigate({ to: "/admin/login" });
        return;
      }
      const data = await response.json();
      setUser(data.user);
    } catch {
      navigate({ to: "/admin/login" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    navigate({ to: "/admin/login" });
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur-lg shadow-sm">
        <div className="flex h-[4.5rem] items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-border p-2 transition-colors hover:bg-muted lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">EZA Logistics</p>
                <h1 className="text-base font-semibold tracking-tight lg:text-lg">Operations console</h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            {user && (
              <div className="hidden items-center gap-3 border-l border-border pl-4 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {user.username.slice(0, 1).toUpperCase()}
                </div>
                <div className="hidden leading-tight lg:block">
                  <p className="text-sm font-semibold">{user.username}</p>
                  <p className="text-[11px] text-muted-foreground">Administrator</p>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 rounded-full border-0 bg-transparent shadow-none hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky lg:top-[4.5rem] lg:h-[calc(100vh-4.5rem)] inset-y-0 left-0 z-40 w-64 border-r border-border bg-card transition-transform duration-300 ease-in-out pt-20 lg:pt-0 shadow-xl lg:shadow-none`}
        >
          <div className="hidden border-b border-border px-6 py-6 lg:block">
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
            <p className="mt-2 text-sm font-medium">Manchester hub</p>
            <p className="mt-1 text-xs text-muted-foreground">Live submissions &amp; requests</p>
          </div>
          <nav className="space-y-1 p-4">
            <NavItem
              icon={<LayoutDashboard className="h-[18px] w-[18px]" />}
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => {
                setActiveTab("overview");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={<MessageSquare className="h-[18px] w-[18px]" />}
              label="Contact Forms"
              active={activeTab === "contacts"}
              onClick={() => {
                setActiveTab("contacts");
                setMobileMenuOpen(false);
              }}
            />
            <NavItem
              icon={<FileText className="h-[18px] w-[18px]" />}
              label="Quote Requests"
              active={activeTab === "quotes"}
              onClick={() => {
                setActiveTab("quotes");
                setMobileMenuOpen(false);
              }}
            />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 lg:p-8">
          <div className="mx-auto max-w-[1400px]">
            {activeTab === "overview" && <DashboardOverview />}
            {activeTab === "contacts" && <ContactsView />}
            {activeTab === "quotes" && <QuotesView />}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}

// Nav Item Component
function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

// Dashboard Overview
function DashboardOverview() {
  const [stats, setStats] = useState({ contacts: 0, quotes: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [contactsRes, quotesRes] = await Promise.all([
        fetch('/api/get-contacts'),
        fetch('/api/get-quotes'),
      ]);

      const contactsData = await contactsRes.json();
      const quotesData = await quotesRes.json();

      const pendingQuotes = quotesData.quotes?.filter((q: any) => q.status === "pending").length || 0;

      setStats({
        contacts: contactsData.total ?? contactsData.contacts?.length ?? 0,
        quotes: quotesData.total ?? quotesData.quotes?.length ?? 0,
        pending: pendingQuotes,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold">Dashboard Overview</h2>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7 lg:space-y-9">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Monday, 07 September 2026</p>
          <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">Good morning, {"admin"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Here is what needs your attention today.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchStats} className="gap-2 self-start rounded-md sm:self-auto">
          <RefreshCw className="h-4 w-4" />
          Refresh data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          icon={<MessageSquare className="h-6 w-6" />}
          label="Total Contacts"
          value={stats.contacts}
          color="blue"
        />
        <StatCard
          icon={<FileText className="h-6 w-6" />}
          label="Total Quotes"
          value={stats.quotes}
          color="green"
        />
        <StatCard
          icon={<Clock className="h-6 w-6" />}
          label="Pending Quotes"
          value={stats.pending}
          color="orange"
        />
      </div>

      {/* Quick Stats Summary */}
      <div className="neumorphic-card p-5 lg:p-6">
        <h3 className="mb-5 flex items-center gap-2 text-base font-semibold">
          <TrendingUp className="h-5 w-5 text-primary" />
          At a glance
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="neumorphic-card flex items-center justify-between gap-4 p-4">
            <span className="text-sm font-medium">New Contacts Today</span>
            <span className="data-mono text-xl font-semibold text-primary">0</span>
          </div>
          <div className="neumorphic-card flex items-center justify-between gap-4 p-4">
            <span className="text-sm font-medium">Pending Review</span>
            <span className="data-mono text-xl font-semibold text-primary">{stats.pending}</span>
          </div>
          <div className="neumorphic-card flex items-center justify-between gap-4 p-4">
            <span className="text-sm font-medium">Total Submissions</span>
            <span className="data-mono text-xl font-semibold">{stats.contacts + stats.quotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "blue" | "green" | "orange";
}) {
  const colors = {
    blue: "text-cobalt",
    green: "text-muted-green",
    orange: "text-primary",
  };

  return (
    <div className="neumorphic-card p-6">
      <div className="mb-7 flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <span className={colors[color]}>{icon}</span>
      </div>
      <p className={`data-mono text-4xl font-semibold tracking-tight ${colors[color]}`}>{value}</p>
      <p className="mt-2 text-xs text-muted-foreground">Updated just now</p>
    </div>
  );
}

// Contacts View
function ContactsView() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/get-contacts');
      const data = await response.json();
      setContacts(data.contacts || []);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/update-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchContacts();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteContact = async (id: string) => {
    if (!window.confirm("Delete this contact submission permanently?")) return;
    try {
      const response = await fetch("/api/delete-contact", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Delete failed");
      await fetchContacts();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold">Contact Form Submissions</h2>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Inbox</p>
          <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">Contact submissions</h2>
          <p className="mt-2 text-sm text-muted-foreground">Customer enquiries waiting for a response.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchContacts} className="w-full gap-2 rounded-md sm:w-auto">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-lg">
          <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No contact submissions yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="neumorphic-card p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-neumorphic-lg)] lg:p-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-base font-semibold">{contact.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      {contact.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{contact.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={contact.status} />
                </div>

                {contact.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{contact.company}</span>
                  </div>
                )}

                <div className="text-sm">
                  <span className="font-medium">Type:</span> {contact.enquiryType}
                </div>

                <div className="border-l-2 border-primary/50 bg-muted/35 p-4">
                  <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                </div>

                <div className="flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {new Date(contact.createdAt).toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(contact._id, "in-progress")}
                      disabled={contact.status === "in-progress"}
                    >
                      In Progress
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(contact._id, "resolved")}
                      disabled={contact.status === "resolved"}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Resolved
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteContact(contact._id)}
                      className="border-red-500/25 text-red-600 hover:border-red-500/50 hover:bg-red-500/5"
                      title="Delete submission"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Quotes View
function QuotesView() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/get-quotes');
      const data = await response.json();
      setQuotes(data.quotes || []);
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/update-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchQuotes();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!window.confirm("Delete this quote request permanently?")) return;
    try {
      const response = await fetch("/api/delete-quote", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Delete failed");
      await fetchQuotes();
    } catch (error) {
      console.error("Failed to delete quote:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl lg:text-3xl font-bold">Quote Requests</h2>
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Pipeline</p>
          <h2 className="text-2xl font-semibold tracking-tight lg:text-3xl">Quote requests</h2>
          <p className="mt-2 text-sm text-muted-foreground">Review shipment requirements and move requests forward.</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchQuotes} className="w-full gap-2 rounded-md sm:w-auto">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {quotes.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-lg">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No quote requests yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote._id}
              className="neumorphic-card p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-neumorphic-lg)] lg:p-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-base font-semibold">{quote.name}</h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{quote.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <span>{quote.phone}</span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={quote.status} />
                </div>

                {quote.company && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{quote.company}</span>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-border bg-white/60 p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-3">Shipment Details</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="font-medium">From:</span> {quote.collectionPostcode}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-green-600" />
                        <span className="font-medium">To:</span> {quote.deliveryPostcode}
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{quote.shipmentSize} • {quote.serviceSpeed}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {quote.weightKg} kg • {quote.numberOfItems} items
                      </div>
                    </div>
                  </div>

                  {quote.quoteBreakdown && (
                    <div className="border border-primary/25 bg-primary/10 p-4">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Estimated Cost</p>
                      <p className="text-3xl font-bold text-primary">
                        £{quote.quoteBreakdown.total.toFixed(2)}
                      </p>
                      {quote.quoteBreakdown.eta && (
                        <p className="text-xs text-muted-foreground mt-2">
                          ETA: {quote.quoteBreakdown.eta}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {quote.additionalHandling && quote.additionalHandling.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Additional Handling:</p>
                    <div className="flex flex-wrap gap-2">
                      {quote.additionalHandling.map((h: string) => (
                        <span key={h} className="border border-border bg-muted px-3 py-1 text-xs">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {quote.specialInstructions && (
                  <div className="border-l-2 border-primary/50 bg-muted/35 p-4">
                    <p className="text-sm font-medium mb-2">Special Instructions:</p>
                    <p className="text-sm whitespace-pre-wrap text-muted-foreground">
                      {quote.specialInstructions}
                    </p>
                  </div>
                )}

                {(quote.preferredCollectionDate || quote.preferredCollectionTime) && (
                  <div className="text-sm">
                    <span className="font-medium">Preferred Collection:</span>{" "}
                    {quote.preferredCollectionDate} {quote.preferredCollectionTime}
                  </div>
                )}

                <div className="flex flex-col justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {new Date(quote.createdAt).toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(quote._id, "quoted")}
                      disabled={quote.status === "quoted"}
                    >
                      Quoted
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(quote._id, "approved")}
                      disabled={quote.status === "approved"}
                    >
                      Approved
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(quote._id, "completed")}
                      disabled={quote.status === "completed"}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Completed
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteQuote(quote._id)}
                      className="border-red-500/25 text-red-600 hover:border-red-500/50 hover:bg-red-500/5"
                      title="Delete quote request"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    "in-progress": "bg-orange-500/10 text-orange-600 border-orange-500/20",
    quoted: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    approved: "bg-green-500/10 text-green-600 border-green-500/20",
    completed: "bg-green-500/10 text-green-600 border-green-500/20",
    resolved: "bg-green-500/10 text-green-600 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
  };

  return (
    <span className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${colors[status] || "bg-gray-500/10 text-gray-600 border-gray-500/20"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status.replace("-", " ")}
    </span>
  );
}
