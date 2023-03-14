namespace Application.Scenarios
{
  public class AttendeeDto
  {
    public string Username { get; set; }
    public string DisplayName { get; set; }
    public string Bio { get; set; }
    public string Image { get; set; }
    public string Department { get; set; }
    public string Title { get; set; }
    public bool Following { get; set; }
    public int FollowersCount { get; set; }
    public int FollowingCount { get; set; }

  }
}