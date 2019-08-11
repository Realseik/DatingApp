using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
            .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(src => src.DateOfBirth.CalculateAge());
            })
             .ForMember(dest => dest.KnowAs, opt =>
            {
                opt.MapFrom(src => src.UserName);
            });

            CreateMap<User, UserForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
             .ForMember(dest => dest.Age, opt =>
            {
                opt.MapFrom(src => src.DateOfBirth.CalculateAge());
            })
            .ForMember(dest => dest.KnowAs, opt =>
            {
                opt.MapFrom(src => src.UserName);
            });

            CreateMap<UserForUpdateDto, User>();

            CreateMap<Photo, PhotoForDetailedDto>();
            //CreateMap<Photo, PhotoForCreationDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}