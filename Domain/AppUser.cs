using Microsoft.AspNetCore.Identity;

namespace Domain
{
  public class AppUser : IdentityUser
  {
    public string DisplayName { get; set; }
    public string Department { get; set; }
    public string Title { get; set; }
    public string Bio { get; set; }
    public ICollection<ScenarioAttendee> Scenarios { get; set; }
    public ICollection<Photo> Photos { get; set; }
    public ICollection<UserFollowing> Followings { get; set; }
    public ICollection<UserFollowing> Followers { get; set; }

  }
}