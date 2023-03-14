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
      string currentUsername = null;
      CreateMap<Scenario, Scenario>();
      CreateMap<Scenario, ScenarioDto>()
      .ForMember(d => d.HostUsername, o => o.MapFrom(s => s.Attendees.FirstOrDefault(x => x.isHost).AppUser.UserName));

      CreateMap<ScenarioAttendee, AttendeeDto>()
      .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
      .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
      .ForMember(d => d.Department, o => o.MapFrom(s => s.AppUser.Department))
      .ForMember(d => d.Title, o => o.MapFrom(s => s.AppUser.Title))
      .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
      .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
      .ForMember(d => d.Following, o => o.MapFrom(s => s.AppUser.Followers.Any(x => x.Observer.UserName == currentUsername)))
      .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.AppUser.Followers.Count))
      .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.AppUser.Followings.Count));

      CreateMap<AppUser, Profiles.Profile>()
      .ForMember(d => d.Image, s => s.MapFrom(o => o.Photos.FirstOrDefault(x => x.IsMain).Url))
      .ForMember(d => d.FollowersCount, o => o.MapFrom(s => s.Followers.Count))
      .ForMember(d => d.FollowingCount, o => o.MapFrom(s => s.Followings.Count))
      .ForMember(d => d.Following, o => o.MapFrom(s => s.Followers.Any(x => x.Observer.UserName == currentUsername)));

      CreateMap<Comment, CommentDto>()
      .ForMember(d => d.Username, s => s.MapFrom(o => o.Author.UserName))
      .ForMember(d => d.DisplayName, s => s.MapFrom(o => o.Author.DisplayName))
      .ForMember(d => d.Image, s => s.MapFrom(o => o.Author.Photos.FirstOrDefault(x => x.IsMain).Url));

    }
  }
}