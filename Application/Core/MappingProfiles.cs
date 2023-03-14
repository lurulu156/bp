using Application.Comments;
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

      CreateMap<ScenarioAttendee, AttendeeDto>()
      .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
      .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
      .ForMember(d => d.Department, o => o.MapFrom(s => s.AppUser.Department))
      .ForMember(d => d.Title, o => o.MapFrom(s => s.AppUser.Title))
      .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
      .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));

      CreateMap<AppUser, Profiles.Profile>()
      .ForMember(d => d.Image, s => s.MapFrom(o => o.Photos.FirstOrDefault(x => x.IsMain).Url));

      CreateMap<Comment, CommentDto>()
      .ForMember(d => d.Username, s => s.MapFrom(o => o.Author.UserName))
      .ForMember(d => d.DisplayName, s => s.MapFrom(o => o.Author.DisplayName))
      .ForMember(d => d.Image, s => s.MapFrom(o => o.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

    }
  }
}