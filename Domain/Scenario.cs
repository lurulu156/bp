namespace Domain
{
  public class Scenario
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public DateTime DueDate { get; set; }
    public string Description { get; set; }
    public string Category { get; set; }
    public string BPCycle { get; set; }
    public string File { get; set; }
    public bool IsCancelled { get; set; }
    public ICollection<ScenarioAttendee> Attendees { get; set; }

  }
}