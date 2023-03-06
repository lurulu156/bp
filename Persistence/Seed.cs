using Domain;

namespace Persistence
{
  public class Seed
  {
    public static async Task SeedData(DataContext context)
    {
      if (context.Scenarios.Any()) return;

      var scenarios = new List<Scenario>
            {
                new Scenario
                {
                    Title = "SR23",
                    DueDate = DateTime.UtcNow.AddMonths(-2),
                    Description = "Scenario 2 months ago",
                    Category = "Capacity",
                    BPCycle = "19D1",
                    File = "19D1SR23",
                },
                new Scenario
                {
                    Title = "SR26",
                    DueDate = DateTime.UtcNow.AddMonths(-1),
                    Description = "Scenario 1 months ago",
                    Category = "Cost",
                    BPCycle = "19D1",
                    File = "19D1SR26",
                },
                new Scenario
                {
                    Title = "SR1",
                    DueDate = DateTime.UtcNow.AddMonths(1),
                    Description = "Scenario 1 months in future",
                    Category = "Facility",
                    BPCycle = "20A1",
                    File = "20A1SR1",
                },
                new Scenario
                {
                    Title = "SR3",
                    DueDate = DateTime.UtcNow.AddMonths(2),
                    Description = "Scenario 2 months in future",
                    Category = "Cost",
                    BPCycle = "20A1",
                    File = "20A1SR3",
                },
                new Scenario
                {
                    Title = "SR9",
                    DueDate = DateTime.UtcNow.AddMonths(3),
                    Description = "Scenario 3 months in future",
                    Category = "Cost",
                    BPCycle = "20B1",
                    File = "20B1SR9",
                },
                new Scenario
                {
                    Title = "SR10",
                    DueDate = DateTime.UtcNow.AddMonths(4),
                    Description = "Scenario 4 months in future",
                    Category = "Cost",
                    BPCycle = "20B1",
                    File = "20B1SR10",
                },
                new Scenario
                {
                    Title = "SR11",
                    DueDate = DateTime.UtcNow.AddMonths(5),
                    Description = "Scenario 5 months in future",
                    Category = "Cost",
                    BPCycle = "20B1",
                    File = "20B1SR11",
                },
                new Scenario
                {
                    Title = "SR11",
                    DueDate = DateTime.UtcNow.AddMonths(6),
                    Description = "Scenario 6 months in future",
                    Category = "Capacity",
                    BPCycle = "20C1",
                    File = "20C1SR11",
                },
                new Scenario
                {
                    Title = "SR21",
                    DueDate = DateTime.UtcNow.AddMonths(7),
                    Description = "Scenario 7 months in future",
                    Category = "Capacity",
                    BPCycle = "20C1",
                    File = "20C1SR21",
                },
                new Scenario
                {
                    Title = "SR28",
                    DueDate = DateTime.UtcNow.AddMonths(8),
                    Description = "Scenario 8 months in future",
                    Category = "Capacity",
                    BPCycle = "20D1",
                    File = "20D1SR28",
                }
            };

      await context.Scenarios.AddRangeAsync(scenarios);
      await context.SaveChangesAsync();
    }
  }
}