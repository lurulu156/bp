using Application.Scenarios;
using AutoMapper;
using Domain;

namespace Application.Core
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      CreateMap<Scenario, Scenario>();
      CreateMap<Scenario, ScenarioDto>()
      .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.isHost).AppUser.UserName));
      CreateMap<ScenarioAttendee, Profiles.Profile>()
      .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
      .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
      .ForMember(d => d.Department, o => o.MapFrom(s => s.AppUser.Department))
      .ForMember(d => d.Title, o => o.MapFrom(s => s.AppUser.Title))
      .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio));

    }
  }
}