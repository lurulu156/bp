namespace Domain
{
  public class ScenarioAttendee
  {
    public string AppUserId { get; set; }
    public AppUser AppUser { get; set; }
    public Guid ScenarioId { get; set; }
    public Scenario Scenario { get; set; }
    public bool isHost { get; set; }
  }
}