using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace EcommerceAppBackend.Models;

[Table("ACCOUNT_TYPE")]
public partial class AccountType
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Required]
    [Column("ac_status")]
    public bool? AcStatus { get; set; }

    [InverseProperty("Ac")]
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
