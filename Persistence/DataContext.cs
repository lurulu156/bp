using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
  public class DataContext : IdentityDbContext<AppUser>
  {
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Scenario> Scenarios { get; set; }
    public DbSet<ScenarioAttendee> ScenarioAttendees { get; set; }
    public DbSet<Photo> Photos { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<UserFollowing> UserFollowings { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.Entity<ScenarioAttendee>(x => x.HasKey(sa => new { sa.AppUserId, sa.ScenarioId }));
      builder.Entity<ScenarioAttendee>()
        .HasOne(u => u.AppUser)
        .WithMany(u => u.Scenarios)
        .HasForeignKey(sa => sa.AppUserId);

      builder.Entity<ScenarioAttendee>()
        .HasOne(s => s.Scenario)
        .WithMany(s => s.Attendees)
        .HasForeignKey(sa => sa.ScenarioId);

      builder.Entity<Comment>()
        .HasOne(s => s.Scenario)
        .WithMany(c => c.Comments)
        .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<UserFollowing>(b =>
      {
        b.HasKey(k => new { k.ObserverId, k.TargetId });

        b.HasOne(o => o.Observer)
          .WithMany(f => f.Followings)
          .HasForeignKey(o => o.ObserverId)
          .OnDelete(DeleteBehavior.Cascade);

        b.HasOne(t => t.Target)
          .WithMany(f => f.Followers)
          .HasForeignKey(t => t.TargetId)
          .OnDelete(DeleteBehavior.Cascade);
      });

    }

  }
}